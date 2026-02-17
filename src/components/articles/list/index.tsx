import type { IArticleListProps } from "./interface";
import type { FC } from "react";
import { useEffect, useState } from "react";
import CustomTable from "@components/common/table";
import type { ITableRow } from "@components/common/table/interface";
import columns from "@components/articles/list/columns";
import actions from "@components/articles/list/actions";
import MultipleSelection from "@components/articles/list/multipleSelection";
import type { ArticleStatusEnum } from "@interfaces/article.interface";

interface Article extends ITableRow {
    title: string;
    author: string;
    status: string;
    network: string;
    categories: string[];
    createdAt: Date;
    featured: boolean;
}

const ArticleList: FC<IArticleListProps> = (props) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

    useEffect(() => {
        setArticles((props.items || []).map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt),
        })));
    }, [props.items]);

    const handleEdit = (rowId: string | number) => {
        props.onEdit(rowId);
    };

    const handleToggleFeature = (rowId: string | number) => {
        props.onFeature(rowId);
    };

    const handleArchive = (rowId: string | number) => {
        props.onArchive(rowId);
    };

    const handleDelete = (rowId: string | number) => {
        props.onDelete(rowId);
    };

    const handleSelectionChange = (ids: (string | number)[]) => {
        setSelectedIds(ids);
    };

    const handleChangeStatus = async (status: ArticleStatusEnum) => {
        try {
            if (props.onChangeMultipleStatus) {
                // Convert ArticleStatusEnum to lowercase for API
                const statusString = String(status);
                const statusLowercase = statusString.toLowerCase() as 'draft' | 'published' | 'archived';
                await props.onChangeMultipleStatus(selectedIds, statusLowercase);
            }
        } catch (error) {
            console.error('Error changing status:', error);
        } finally {
            setSelectedIds([]);
        }
    };

    const handleClearSelection = () => {
        setSelectedIds([]);
    };

    return (
        <>
            <MultipleSelection 
                selectedCount={selectedIds.length}
                onChangeStatus={handleChangeStatus}
                onClearSelection={handleClearSelection}
            />
            <CustomTable
                columns={columns(handleToggleFeature, props.categories)}
                rows={articles}
                actions={actions({
                    onEdit: handleEdit,
                    onFeature: handleToggleFeature,
                    onArchive: handleArchive,
                    onDelete: handleDelete,
                })}
                onSelectionChange={handleSelectionChange}
                selected={selectedIds}
                selectable={true}
                stickyHeader={true}
                emptyMessage="Aucun article trouvé"
            />
        </>
    );
};

export default ArticleList;
