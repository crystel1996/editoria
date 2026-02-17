import { css } from "@emotion/react";

const style = {
    card: css({
        borderRadius: "2px",
        border: "1px solid var(--mui-palette-divider, rgba(0, 0, 0, 0.12))",
        boxShadow: "0 6px 16px rgba(24, 37, 67, 0.08)",
    }),
    content: css({
        padding: "20px",
    }),
    layout: css({
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    }),
    headerRow: css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    }),
    titleGroup: css({
        display: "flex",
        alignItems: "center",
        gap: "8px",
    }),
    title: css({
        fontWeight: 700,
    }),
    actions: css({
        display: "flex",
        alignItems: "center",
        gap: "4px",
    }),
    badge: css({
        borderRadius: "999px",
        fontWeight: 600,
    }),
    colorDot: (color?: string) =>
        css({
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: color ?? "#3b82f6",
        }),
};

export default style;
