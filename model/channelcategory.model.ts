import sql from './db';

export interface ChannelCategoryInfo {
  name: string;
  workspace_idx: number;
}

export interface ChannelCategoryData {
  category_idx: number;
  name: string;
  workspace_idx: number;
}

export class ChannelCategoryModel {
  // 채널 카테고리 db 조회
  // eslint-disable-next-line class-methods-use-this
  async getAll(
    result: (err: Error | null, data: ChannelCategoryData[] | null) => void
  ) {
    sql.query('SELECT * FROM channelcategory;', (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  // async getAll2() {
  //   const category = await sql.query('SELECT * FROM channelcategory;');
  //   console.log('모델');
  //   console.log(category);
  //   return category;
  // }

  // 채널 카테고리 db에 등록
  // eslint-disable-next-line class-methods-use-this
  async create(
    newChannelCategory: ChannelCategoryInfo,
    result: (err: Error | null, data: ChannelCategoryData | null) => void
  ) {
    console.log(newChannelCategory);
    sql.query(
      'INSERT INTO channelcategory SET ?',
      newChannelCategory,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        console.log({ category_idx: res.insertId, ...newChannelCategory });
        result(null, { category_idx: res.insertId, ...newChannelCategory });
      }
    );
  }
}

const channelCategoryModel = new ChannelCategoryModel();
export { channelCategoryModel };
