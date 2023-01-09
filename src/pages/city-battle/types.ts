export interface i18n {
    name: {
        [key: string]: string
    },
    description: {
        [key: string]: string
    }
}

export interface IParticipant {
    votes: {
        count: number;
        percent: number;
    },
    participant: {
        code: string;
        createdAt: string;
        description: string;
        name: string;
        type: string;
        uuid: string;
        i18n: i18n;
        images?: {
            main: string;
        }
    }
}

export interface IBattle {
    uuid: string;
    name: string;
    game: string;
    startDate: string;
    endDate: string;
    url: string;
    i18n: i18n;
    participants: IParticipant[]
}