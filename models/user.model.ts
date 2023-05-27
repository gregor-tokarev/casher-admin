export class UserOauth {
    id: string;
    provider: "yandex" | "vk";
    providerId: string;
    email: string;
    // eslint-disable-next-line no-use-before-define
    user: User;
}

export class User {
    id: string;
    avatarUrl?: string;
    createdAt: string;
    name: string;
    surname: string;
    sex: "male" | "female";
    oauth: UserOauth;
}

export class UserResponse extends User {
    totalOrder: number;
}
