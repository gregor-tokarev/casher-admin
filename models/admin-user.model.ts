export class AdminUser {
    id: string;
    email: string;
    createdAt: string;
    lastLoginAt: string;
    // eslint-disable-next-line no-use-before-define
    permissions: AdminPermissions[];
    addedBy: string;
}

export enum AdminPermissions {
    CREATE_PRODUCTS = "create_products",
    DELETE_PRODUCTS = "delete_products",
    UPDATE_PRODUCTS = "update_products",

    ADD_ADMIN = "add_admin",
    ADD_PLUGINS = "add_plugins",

    AUTH_SETTINGS = "auth_settings",
    DB_SETTINGS = "db_settings",
}
