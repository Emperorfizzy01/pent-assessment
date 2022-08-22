export class CreateReviewDto {
    readonly id?: number;
    readonly comment: string;
    readonly email?: string;
    readonly attachments: String[];
}