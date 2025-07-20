import { componentDevelopment, projectArchitecture } from '@/assets/docs';

export const DEFAULT_NAME = 'xiebia';

export interface ChatMessage {
  sender: 'user' | 'mask';
  content: string;
}

export interface MaskItem {
  id: number;
  name: string;
  dialogue: ChatMessage[];
}

export interface DocItem {
  id: number;
  title: string;
  content?: string; // 保留兼容性，可选
  filename?: string; // 新增：Markdown文件名
  category: string;
  createTime: string;
  updateTime: string;
}

export interface DocCategory {
  id: number;
  name: string;
  count: number;
}

export const docCategories: DocCategory[] = [
  { id: 2, name: '项目笔记', count: 2 },
  { id: 1, name: '技术文档', count: 2 },
  { id: 3, name: '页面美化', count: 2 }, // 增加了螃蟹点击效果文档
];

export const docList: DocItem[] = [
  {
    id: 4,
    title: '项目架构设计思路',
    content: projectArchitecture,
    category: '项目笔记',
    createTime: '2024-01-08',
    updateTime: '2024-01-15',
  },
  {
    id: 5,
    title: '组件化开发实践',
    content: componentDevelopment,
    category: '项目笔记',
    createTime: '2024-01-03',
    updateTime: '2024-01-10',
  },
  {
    id: 9,
    title: '页面滑动交互的实现',
    filename: '页面滑动交互的实现.md', // 使用动态加载
    category: '技术文档',
    createTime: '2024-01-22',
    updateTime: '2024-01-22',
  },
  {
    id: 11,
    title: 'HeartCanvas 3D心形绘制实现详解',
    filename: 'heart-canvas-implementation.md', // 🆕 3D心形技术文档
    category: '技术文档',
    createTime: '2024-01-22',
    updateTime: '2024-01-22',
  },
  {
    id: 10,
    title: '滚动条自定义与隐藏实现',
    filename: 'custom-scrollbar-implementation.md', // 🆕 新文档
    category: '页面美化',
    createTime: '2024-01-22',
    updateTime: '2024-01-22',
  },
  {
    id: 12,
    title: '螃蟹点击效果实现详解',
    filename: 'crab-click-effect-implementation.md', // 🆕 螃蟹点击特效文档
    category: '页面美化',
    createTime: '2024-01-22',
    updateTime: '2024-01-22',
  },
];

export const maskList: MaskItem[] = [
  {
    id: 0,
    name: '蟹老师',
    dialogue: [
      { sender: 'mask', content: '我们已互相关注，可以开始聊天了' },
      { sender: 'mask', content: '是你吗涛涛' },
      { sender: 'user', content: '是我蟹老师' },
      { sender: 'user', content: '👍' },
      { sender: 'mask', content: '哈哈哈哈哈我猜对了' },
      { sender: 'mask', content: '不愧是我' },
    ],
  },
  {
    id: 1,
    name: 'biabia',
    dialogue: [
      { sender: 'user', content: '高中同学称呼你英文名怎么说的' },
      { sender: 'user', content: '比啊蟹嘛' },
      { sender: 'mask', content: '我高中老师也这么叫' },
      { sender: 'mask', content: '就是，呃，xiebia' },
      { sender: 'mask', content: '波一啊bia，xiebia' },
      { sender: 'mask', content: '但是有人会叫biabia，然后有人会叫bia姐，都可以~' },
    ],
  },
  {
    id: 2,
    name: '好汉',
    dialogue: [
      { sender: 'mask', content: '我也很多年没去过故宫了' },
      { sender: 'user', content: '你去过长城嘛' },
      { sender: 'mask', content: '去过的，但也很多年没爬了' },
      { sender: 'user', content: '好汉 尼拔蟹' },
      { sender: 'mask', content: '你想去的话我可以陪你一起' },
      { sender: 'user', content: '👍' },
      { sender: 'user', content: '太可靠了蟹老师' },
    ],
  },
  {
    id: 3,
    name: 'xiebia',
    dialogue: [
      { sender: 'user', content: '高中同学称呼你英文名怎么说的' },
      { sender: 'user', content: '比啊蟹嘛' },
      { sender: 'mask', content: '我高中老师也这么叫' },
      { sender: 'mask', content: '就是，呃，xiebia' },
      { sender: 'mask', content: '波一啊bia，xiebia' },
      { sender: 'mask', content: '但是有人会叫biabia，然后有人会叫bia姐，都可以~' },
    ],
  },
  {
    id: 5,
    name: 'bia姐',
    dialogue: [
      { sender: 'user', content: '高中同学称呼你英文名怎么说的' },
      { sender: 'user', content: '比啊蟹嘛' },
      { sender: 'mask', content: '我高中老师也这么叫' },
      { sender: 'mask', content: '就是，呃，xiebia' },
      { sender: 'mask', content: '波一啊bia，xiebia' },
      { sender: 'mask', content: '但是有人会叫biabia，然后有人会叫bia姐，都可以~' },
    ],
  },
  {
    id: 6,
    name: '汉尼拔蟹',
    dialogue: [
      { sender: 'mask', content: '我会每天为你诵经祈祷的' },
      { sender: 'mask', content: '希望涛涛每天都可以提前下班🙏' },
      { sender: 'user', content: '那我也得每天祈祷下蟹老师顺利上岸' },
      { sender: 'user', content: '👍' },
      { sender: 'mask', content: '好耶' },
      { sender: 'mask', content: '那也逃不掉汉尼拔蟹要啃你' },
      { sender: 'mask', content: '聪明小孩注定是我的盘中餐' },
    ],
  },
  {
    id: 7,
    name: '耶路撒冷',
    dialogue: [
      { sender: 'user', content: '坐我对面实习生走了，现在没有东西挡住我和组里几位正职' },
      { sender: 'user', content: '瞬间就没安全感了' },
      { sender: 'mask', content: '公司失去他像鱼失去自行车' },
      { sender: 'mask', content: '你失去他像西方不能没有耶路撒冷' },
      { sender: 'mask', content: '没关系的涛涛，或许明天就会有新的' },
      { sender: 'mask', content: '都闪开！涛涛的耶路撒冷来了' },
      { sender: 'user', content: '蟹老师坐我对面我不得贼开心' },
    ],
  },
  {
    id: 8,
    name: '神奇女侠',
    dialogue: [
      { sender: 'mask', content: '哈哈哈哈希望我能继续给你带来好运' },
      { sender: 'mask', content: '助力这位涛顺利完成实习，顺利毕业' },
      { sender: 'user', content: '也祝蟹老师顺利上岸' },
      { sender: 'user', content: 'I am a man of fortune, and I must seek my fortune' },
      { sender: 'mask', content: '眼睛进沙子了看不清' },
      { sender: 'user', content: '蟹老师是不是看剧经常会哭' },
      { sender: 'mask', content: '我神奇女侠' },
      { sender: 'mask', content: '我不哭' },
    ],
  },
  {
    id: 9,
    name: '北海鲛人',
    dialogue: [
      { sender: 'user', content: '我打游戏npc死了和看剧有的角色死了我真的会哭' },
      { sender: 'mask', content: '其实我也' },
      { sender: 'user', content: '我知道，即使是好汉尼拔耶路撒冷神奇女侠蟹老师也会流泪' },
      { sender: 'mask', content: '流下的眼泪会变成小珍珠' },
      { sender: 'mask', content: '你看到记得收集拿去卖' },
      { sender: 'user', content: '好的' },
      { sender: 'mask', content: '看到你幸福我也会很欣慰' },
    ],
  },
  {
    id: 10,
    name: '蝙蝠侠',
    dialogue: [
      { sender: 'user', content: '分享完了，被拷打' },
      { sender: 'mask', content: '嫉妒你才华故意打压' },
      { sender: 'mask', content: '别信他们' },
      { sender: 'user', content: '好家伙，蟹老师的偏爱，其实是文章里的问题我自己也回答不上来' },
      { sender: 'mask', content: '你等我变成蝙蝠侠咬他们' },
    ],
  },
  {
    id: 11,
    name: '小皇帝',
    dialogue: [
      { sender: 'mask', content: '听到没，我是小皇帝，你们都不许忤逆背叛皇帝' },
      { sender: 'mask', content: '与朕作对者 斩！' },
      { sender: 'user', content: 'As u please, your grace' },
    ],
  },
  {
    id: 12,
    name: '路见不平biabia蟹',
    dialogue: [
      { sender: 'mask', content: '涛就是如此善良惯着' },
      { sender: 'mask', content: '我支持你在群里骂他' },
      { sender: 'mask', content: '先过了嘴瘾再说' },
      { sender: 'user', content: '路见不平biabia蟹上线' },
      { sender: 'mask', content: '你' },
      { sender: 'user', content: '我' },
      { sender: 'mask', content: '真的很可爱' },
      { sender: 'mask', content: '睡觉了' },
    ],
  },
  {
    id: 13,
    name: '魅魔蟹',
    dialogue: [
      { sender: 'mask', content: '(分享被蚊子叮的原因)' },
      { sender: 'mask', content: '太专业了' },
      { sender: 'mask', content: '魅魔就是连路过的蚊子也会被魅到' },
      { sender: 'user', content: '(soyo坏笑)' },
    ],
  },
  {
    id: 14,
    name: '女明星蟹',
    dialogue: [
      { sender: 'mask', content: '@winter 你好👋初次见面~' },
      { sender: 'user', content: '被女明星回复了？！' },
      { sender: 'user', content: '@全体成员 本群的超级幸运星在此' },
      { sender: 'mask', content: '来了吗？想我了吧？！😊以后我们通过bubble多多沟通，一起幸福吧~' },
      { sender: 'mask', content: '请多多关照，欢迎常来我的频道' },
      { sender: 'user', content: '想你爱你，风里雨里bubble里见你' },
    ],
  },
  {
    id: 16,
    name: '蟹伯乐',
    dialogue: [
      { sender: 'mask', content: '什么居然还要改' },
      { sender: 'mask', content: '那他太没品了，我们涛儿写出来的就是最完美的' },
      { sender: 'user', content: '确实没品，还是蟹老师有品' },
      { sender: 'user', content: '👍' },
      { sender: 'mask', content: '伯乐千里马' },
      { sender: 'mask', content: '说的就是咱俩吧哈哈' },
      { sender: 'mask', content: '你说这俩谁更重要呢' },
      { sender: 'mask', content: '千里马常有而伯乐不常有，那应该是伯乐重要' },
      { sender: 'mask', content: '那我当伯乐，你是千里马' },
      { sender: 'user', content: '好的，蟹伯乐' },
    ],
  },
  {
    id: 17,
    name: '面具蟹',
    dialogue: [
      { sender: 'user', content: '面具蟹' },
      { sender: 'user', content: '上一秒还在“我可没有，我纯坏”' },
      { sender: 'user', content: '现在却“我很单纯一小女孩”' },
      { sender: 'mask', content: '那你愿意接受每一张面具下的我吗' },
      { sender: 'user', content: '我愿意' },
      { sender: 'user', content: '我知道这些都是我爱的你' },
      { sender: 'mask', content: '好感动' },
    ],
  },
  {
    id: 18,
    name: '小怂蟹',
    dialogue: [
      { sender: 'user', content: '小怂蟹' },
      { sender: 'mask', content: '哼，你居然这么说我' },
      { sender: 'user', content: '你知道怂是什么意思吗' },
      { sender: 'mask', content: '什么意思？' },
      { sender: 'user', content: '心上一个从，意思是追从本心' },
      { sender: 'mask', content: '噢~那这个名字还不错' },
    ],
  },
  {
    id: 19,
    name: '蟹妹妹',
    dialogue: [
      { sender: 'user', content: '(红楼梦语音台词输出中)' },
      { sender: 'mask', content: '不错不错😊' },
      { sender: 'mask', content: '林妹妹不清楚，似有八分蟹妹妹神韵在' },
    ],
  },
  {
    id: 20,
    name: '铜墙铁壁蟹bia',
    dialogue: [
      { sender: 'mask', content: '我给你改了个超萌备注' },
      { sender: 'user', content: '我要康康' },
      { sender: 'mask', content: '不给你康' },
      { sender: 'user', content: '坏女人老引诱我' },
      { sender: 'mask', content: '勾的你心头直痒痒' },
      { sender: 'user', content: '下次狂挠你痒的地方' },
      { sender: 'mask', content: '我哪有痒的地方' },
      { sender: 'mask', content: '铜墙铁壁蟹bia' },
    ],
  },
  {
    id: 21,
    name: '胆小蟹',
    dialogue: [
      { sender: 'user', content: '悬疑电影我看的倒是挺多的' },
      { sender: 'mask', content: '电影看的少' },
      { sender: 'mask', content: '你推荐几个我可以看看' },
      { sender: 'mask', content: '我看剧多' },
      { sender: 'user', content: '悬疑看嘛' },
      { sender: 'mask', content: '太恐怖的不行，我胆小' },
    ],
  },
  {
    id: 23,
    name: '缪斯女神蟹',
    dialogue: [
      { sender: 'mask', content: '再回去可以跟好奶奶学一学这大厨般的手艺' },
      { sender: 'user', content: '确实' },
      { sender: 'mask', content: '带着一身好厨艺回来吧菜扔我脸上' },
      { sender: 'mask', content: '指着我的鼻子说，没见过世面的东西！快尝尝这人间美味吧！' },
      { sender: 'user', content: '为了蟹老师，那不得不学会做饭了' },
      { sender: 'mask', content: '哪天我跟你闹脾气了，涛大厨就断了我的饭菜' },
      {
        sender: 'mask',
        content: '我跪在地上像吸毒的人渴望大麻一样抱着涛大厨的腿说：求你了！给我来口吧！',
      },
      { sender: 'user', content: '蟹老师真的好有趣，总是能想出这么好笑的片段' },
      {
        sender: 'mask',
        content: '我的灵魂我的美德我的信仰自此全部崩塌，唯有涛大厨的菜喂我嘴里才可重塑',
      },
      {
        sender: 'mask',
        content: '哈哈哈哈因为跟你聊天总能激发出我创作欲望',
      },
      {
        sender: 'mask',
        content: '哦~灵感缪斯~可能这就是同频的乐趣',
      },
    ],
  },
  {
    id: 24,
    name: '旺旺蟹冰冰',
    dialogue: [
      { sender: 'mask', content: '上午真的很挤' },
      { sender: 'mask', content: '我还正对空调出风口' },
      { sender: 'mask', content: '真快成冰棍儿了' },
      { sender: 'user', content: '太坏了，给我们蟹老师要冻成旺旺蟹冰冰了' },
      { sender: 'mask', content: '那很适合你解暑吃了' },
    ],
  },
  {
    id: 25,
    name: '蟹霸王',
    dialogue: [
      { sender: 'mask', content: '想我了吗' },
      { sender: 'user', content: '嗯' },
      { sender: 'mask', content: '你猜我想不想你呢' },
      { sender: 'user', content: '我猜你想' },
      { sender: 'mask', content: '不' },
      { sender: 'mask', content: '我超级超级想😭' },
      { sender: 'mask', content: '好啊男人' },
      { sender: 'mask', content: '故作矜持' },
      { sender: 'mask', content: '无所谓' },
      { sender: 'mask', content: '姐会霸王硬上弓' },
      { sender: 'user', content: '好的，蟹霸王，期待哦' },
    ],
  },
];
