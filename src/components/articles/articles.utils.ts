const getStatusColor = (status: string) => {
        const colors: Record<string, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
            "Publié": "success",
            "Brouillon": "warning",
            "Archivé": "default",
        };
        return colors[status] || "default";
};

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        Science: "#00BCD4",
        Sport: "#4CAF50",
        Culture: "#9C27B0",
        Business: "#FF9800",
        Technologie: "#2196F3",
        Politique: "#F44336",
    };
    return colors[category] || "#999";
};

export { getStatusColor, getCategoryColor };