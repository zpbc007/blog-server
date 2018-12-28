import { IsString, IsDefined } from 'class-validator';

export class ArticleModifyDto {
    // 文章id
    id?: number;

    // 文章标题
    @IsString({
        message: '文章标题应该为字符串',
    })
    @IsDefined({
        message: '文章标题为必填项',
    })
    title: string;

    // 文章描述
    @IsString({
        message: '文章描述应该为字符串',
    })
    @IsDefined({
        message: '文章描述为必填',
    })
    desc: string;

    // 文章对应tag
    tag_list: number[];

    // 文本内容
    content: string;
}
