/**
 * 领域类型的唯一真源。
 * 替代原先从 @prisma/client 引入的 Memorial / Tag。
 */

/** 标签的运行时值列表 —— 同时供类型推导与运行时校验使用 */
export const TAGS = [
  'FOUNDER',
  'LEADER',
  'CONTRIBUTOR',
  'INNOVATOR',
  'MENTOR',
  'VOLUNTEER',
] as const;

/** 标签类型（等价于原 Prisma enum Tag） */
export type Tag = (typeof TAGS)[number];

/** 中文标签映射（原散在 3 处的 switch / tagOptions 合并到这里） */
export const TAG_LABELS: Record<Tag, string> = {
  FOUNDER: '创始人',
  LEADER: '领导者',
  CONTRIBUTOR: '贡献者',
  INNOVATOR: '创新者',
  MENTOR: '导师',
  VOLUNTEER: '志愿者',
};

/** 运行时类型守卫，替代原先的 Object.values(Tag).includes(...) 校验 */
export function isTag(value: unknown): value is Tag {
  return typeof value === 'string' && (TAGS as readonly string[]).includes(value);
}

export function getTagLabel(tag: Tag): string {
  return TAG_LABELS[tag];
}

/** 页面与组件消费的领域对象 */
export interface Memorial {
  id: number;
  /** 庙号，如「太祖」 */
  title: string;
  /** 姓名，如「韩晨超」 */
  name: string;
  /** 简介 */
  description: string;
  /** 具体事迹（可选） */
  deed?: string;
  /** 标签，归一化后恒存在（可能为空数组） */
  tags: Tag[];
  /** 创建时间（可选） */
  createdAt?: string;
}
