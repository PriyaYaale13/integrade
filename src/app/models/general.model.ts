export interface MenuItem {
    label: string;
    route?: string;
    icon?: string;
    children?: MenuItem[];
    action?: () => void;
    hasMenu?: boolean;
    menuItems?: MenuItem[];
}

export interface SatActFilters {
    semester?: string;
    class?: string;
    searchTeacher?: string;
    searchStudent?: string;
    grade?: string;
}