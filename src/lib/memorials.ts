import rawJson from '@/data/memorials.json';
import { isTag, TAGS, type Memorial, type Tag } from '@/lib/types';

/**
 * 数据源：src/data/memorials.json
 *
 * TypeScript 的 resolveJsonModule 对 JSON 有两个已知行为：
 *   1. 字符串字面量被拓宽成 string —— tags: ["FOUNDER"] 推成 string[] 而非 Tag[]
 *   2. 键不一致的对象数组被推成「对象联合」而非合并类型 —— 一旦有的记录有 deed
 *      有的没有，访问 m.deed 就会报 Property does not exist
 * 所以这里不依赖推断类型，而是显式跨界重建领域对象。
 *
 * 本模块在 `next build` 期间求值，因此 JSON 写错会让构建直接失败并指出位置。
 */
const raw: unknown = rawJson;

function requireString(value: unknown, at: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`${at} 必须是非空字符串`);
  }
  return value;
}

function requirePositiveInt(value: unknown, at: string): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    throw new Error(`${at} 必须是正整数`);
  }
  return value;
}

function parseMemorials(input: unknown): Memorial[] {
  if (!Array.isArray(input)) {
    throw new Error('src/data/memorials.json 顶层必须是数组');
  }

  const memorials = input.map((item, index) => {
    const at = `memorials.json[${index}]`;

    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw new Error(`${at} 必须是对象`);
    }

    const { id, title, name, description, deed, tags, createdAt } = item as Record<string, unknown>;

    const parsedTags: Tag[] = [];
    if (tags !== undefined) {
      if (!Array.isArray(tags)) {
        throw new Error(`${at}.tags 必须是数组`);
      }
      for (const candidate of tags) {
        if (!isTag(candidate)) {
          throw new Error(`${at}.tags 含未知标签 "${String(candidate)}"，可选值：${TAGS.join(' / ')}`);
        }
        parsedTags.push(candidate);
      }
    }

    const memorial: Memorial = {
      id: requirePositiveInt(id, `${at}.id`),
      title: requireString(title, `${at}.title`),
      name: requireString(name, `${at}.name`),
      description: requireString(description, `${at}.description`),
      tags: parsedTags,
    };

    if (deed !== undefined) {
      memorial.deed = requireString(deed, `${at}.deed`);
    }
    if (createdAt !== undefined) {
      memorial.createdAt = requireString(createdAt, `${at}.createdAt`);
    }

    return memorial;
  });

  const seen = new Set<number>();
  for (const memorial of memorials) {
    if (seen.has(memorial.id)) {
      throw new Error(`memorials.json 中 id=${memorial.id} 重复`);
    }
    seen.add(memorial.id);
  }

  return memorials;
}

const memorials = parseMemorials(raw);

/** 全部英灵，按 JSON 中的顺序 */
export function getAllMemorials(): readonly Memorial[] {
  return memorials;
}

/** 按 id 查找，找不到返回 undefined */
export function getMemorialById(id: number): Memorial | undefined {
  return memorials.find((memorial) => memorial.id === id);
}
