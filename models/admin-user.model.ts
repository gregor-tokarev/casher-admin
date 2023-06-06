export class AdminUser {
    id: string;
    email: string;
    createdAt: string;
    lastLoginAt: string;
    // eslint-disable-next-line no-use-before-define
    permissions: AdminPermissions[];
    addedBy: string;
}

export class AllAdminsDto {
    admins: AdminUser[];
    count: number;
}

export enum AdminPermissions {
    CREATE_PRODUCTS = "create_products",
    DELETE_PRODUCTS = "delete_products",
    UPDATE_PRODUCTS = "update_products",

    ADD_ADMIN = "add_admin",
    DELETE_ADMIN = "delete_admin",
    ADD_PLUGINS = "add_plugins",

    PAYMENT_SETTINGS = "payment_settings",
    AUTH_SETTINGS = "auth_settings",
    DB_SETTINGS = "db_settings",
}
