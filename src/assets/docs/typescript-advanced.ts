export const typescriptAdvanced = `# TypeScript 进阶技巧

## 泛型约束

使用 \`extends\` 关键字来约束泛型类型：

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## 条件类型

\`\`\`typescript
type ApiResponse<T> = T extends string ? string : number;
\`\`\`

## 工具类型

### Partial

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
\`\`\`

### Pick

\`\`\`typescript
type UserBasicInfo = Pick<User, 'id' | 'name'>;
\`\`\``;
