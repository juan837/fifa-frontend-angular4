export class Player {
    constructor(
        public _id: string,
        public name: string,
        public second_name: string,
        public birthdate: Date,
        public position: number,
        public jersey: number,
        public holder: boolean,
        public image: string,
        public team: string
    ) {}
}
