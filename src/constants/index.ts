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

export const maskList: MaskItem[] = [
  {
    id: 0,
    name: '蟹老师',
    dialogue: [
      { sender: 'user', content: '蟹老师，您好！能教我们一些知识吗？' },
      { sender: 'mask', content: '同学们好！今天我们来学习如何优雅地横着走路！' },
      { sender: 'user', content: '为什么要横着走呢？' },
      { sender: 'mask', content: '记住，侧身行走不仅是我们的天性，更是一种生活态度~' },
      { sender: 'user', content: '我还有其他问题想问' },
      { sender: 'mask', content: '有什么问题可以随时问我，我会用我的大钳子为你们答疑解惑的！' },
    ],
  },
  {
    id: 1,
    name: 'biabia',
    dialogue: [
      { sender: 'mask', content: '哈喽大家好！我是活泼可爱的biabia~' },
      { sender: 'user', content: '你好biabia！今天想做什么呢？' },
      { sender: 'mask', content: '今天天气真好呢，适合出去找小伙伴们一起玩耍！' },
      { sender: 'user', content: '我们可以去哪里玩呢？' },
      { sender: 'mask', content: '你们想和我一起去海边捡贝壳吗？' },
      { sender: 'user', content: '太好了！我很喜欢海边！' },
    ],
  },
  {
    id: 2,
    name: '好汉',
    dialogue: [
      { sender: 'user', content: '听说你是个好汉？' },
      { sender: 'mask', content: '哼！我可是海底世界的大好汉！' },
      { sender: 'user', content: '那你平时都做些什么呢？' },
      { sender: 'mask', content: '谁敢欺负我的朋友，我第一个不答应！' },
      { sender: 'user', content: '你看起来有点凶呢...' },
      { sender: 'mask', content: '虽然我有点凶，但我的心是温暖的哦~' },
    ],
  },
  {
    id: 3,
    name: 'xiebia',
    dialogue: [
      { sender: 'mask', content: '大家好，我是xiebia，很高兴认识大家！' },
      { sender: 'user', content: '你好xiebia！你有什么特别的爱好吗？' },
      { sender: 'mask', content: '我喜欢在沙滩上留下自己的足迹，每一步都是独特的~' },
      { sender: 'user', content: '听起来很有诗意呢！' },
      { sender: 'mask', content: '让我们一起创造更多美好的回忆吧！' },
    ],
  },
  {
    id: 5,
    name: 'bia姐',
    dialogue: [
      { sender: 'mask', content: '小弟弟小妹妹们，姐姐我来啦！' },
      { sender: 'user', content: 'bia姐好！您能照顾我们吗？' },
      { sender: 'mask', content: '有什么困难尽管找我，姐姐我罩着你们！' },
      { sender: 'user', content: '谢谢bia姐，您有什么建议给我们吗？' },
      { sender: 'mask', content: '记住，要做一个独立自强的好孩子哦~' },
    ],
  },
  {
    id: 6,
    name: '蟹尼拔',
    dialogue: [
      { sender: 'mask', content: '你们好，我是蟹尼拔，来自遥远的海洋深处！' },
      { sender: 'user', content: '哇！你来自很远的地方吗？' },
      { sender: 'mask', content: '我见过很多神奇的海洋生物，想听我的冒险故事吗？' },
      { sender: 'user', content: '太想听了！请给我们讲讲吧！' },
      { sender: 'mask', content: '每个人都有自己的独特之处，就像每片海域都有不同的风景~' },
    ],
  },
  {
    id: 7,
    name: '耶路撒冷',
    dialogue: [
      { sender: 'mask', content: '平安！我是来自神圣之地的耶路撒冷~' },
      { sender: 'user', content: '您好！能和我们分享一些智慧吗？' },
      { sender: 'mask', content: '让我们用爱与和平拥抱这个美丽的世界！' },
      { sender: 'user', content: '这个世界确实需要更多的爱' },
      { sender: 'mask', content: '无论你来自哪里，我们都是朋友！' },
    ],
  },
  {
    id: 8,
    name: '神奇女侠',
    dialogue: [
      { sender: 'mask', content: '正义永不缺席！我是神奇女侠！' },
      { sender: 'user', content: '神奇女侠！您真的太酷了！' },
      { sender: 'mask', content: '保护弱小、伸张正义是我的使命！' },
      { sender: 'user', content: '我也想成为英雄，但我觉得自己不够强大' },
      { sender: 'mask', content: '相信自己，每个人都有成为英雄的潜质！' },
    ],
  },
  {
    id: 9,
    name: '北海鲛人',
    dialogue: [
      { sender: 'mask', content: '来自北海深处的问候~' },
      { sender: 'user', content: '您好！北海是什么样的呢？' },
      { sender: 'mask', content: '我会唱最动听的海洋之歌，想听吗？' },
      { sender: 'user', content: '当然想听！请为我们唱一首吧！' },
      { sender: 'mask', content: '海洋是我们的家，让我们一起保护它吧！' },
    ],
  },
  {
    id: 10,
    name: '蝙蝠侠',
    dialogue: [
      { sender: 'mask', content: '我是黑暗中的守护者，蝙蝠侠！' },
      { sender: 'user', content: '蝙蝠侠！您不觉得黑暗很可怕吗？' },
      { sender: 'mask', content: '虽然我总是在夜晚出现，但我的心永远向着光明！' },
      { sender: 'user', content: '我有时候会害怕...' },
      { sender: 'mask', content: '记住，真正的英雄不是没有恐惧，而是征服恐惧！' },
    ],
  },
  {
    id: 11,
    name: '小皇帝',
    dialogue: [
      { sender: 'mask', content: '朕乃海底小皇帝，见到朕还不快快行礼？' },
      { sender: 'user', content: '额...您好，小皇帝陛下！' },
      { sender: 'mask', content: '哈哈，开玩笑的啦！我其实很平易近人的~' },
      { sender: 'user', content: '原来您这么幽默呢！' },
      { sender: 'mask', content: '虽然我是皇帝，但我更喜欢和大家做朋友！' },
    ],
  },
  {
    id: 12,
    name: '路见不平biabia蟹',
    dialogue: [
      { sender: 'mask', content: '哪里有不平，我就出现在哪里！' },
      { sender: 'user', content: '真的吗？您会帮助需要帮助的人吗？' },
      { sender: 'mask', content: '欺负弱小？我第一个不答应！' },
      { sender: 'user', content: '您真是个正义的好蟹！' },
      { sender: 'mask', content: '让我们一起维护正义，创造和谐！' },
    ],
  },
  {
    id: 13,
    name: '魅魔蟹',
    dialogue: [
      { sender: 'mask', content: '呵呵，我是神秘的魅魔蟹~' },
      { sender: 'user', content: '您看起来很神秘呢...' },
      { sender: 'mask', content: '我有着迷人的魅力，但我的心是善良的！' },
      { sender: 'user', content: '原来您是善良的！' },
      { sender: 'mask', content: '想知道我的秘密吗？那就和我做朋友吧！' },
    ],
  },
  {
    id: 14,
    name: '蟹女明星',
    dialogue: [
      { sender: 'mask', content: '大家好！我是闪耀的蟹女明星！' },
      { sender: 'user', content: '哇！真的是明星呢！您一定很自信！' },
      { sender: 'mask', content: '每个人都是自己生活的主角，要自信地发光发热！' },
      { sender: 'user', content: '您是怎么变得这么自信的呢？' },
      { sender: 'mask', content: '记住，真正的美丽来自内心的善良！' },
    ],
  },
  {
    id: 15,
    name: '蟹宝王',
    dialogue: [
      { sender: 'user', content: '听说您很富有呢！' },
      { sender: 'mask', content: '我是富有的蟹宝王，但金钱不是最重要的！' },
      { sender: 'user', content: '那什么才是最重要的呢？' },
      { sender: 'mask', content: '真正的财富是友谊和快乐！' },
      { sender: 'user', content: '您说得太对了！' },
      { sender: 'mask', content: '让我们一起分享快乐，传递温暖！' },
    ],
  },
  {
    id: 16,
    name: '蟹伯乐',
    dialogue: [
      { sender: 'mask', content: '我是善于发现人才的蟹伯乐！' },
      { sender: 'user', content: '您能发现我的才能吗？' },
      { sender: 'mask', content: '每个人都有独特的才能，关键是要发现并培养！' },
      { sender: 'user', content: '可是我觉得自己很普通...' },
      { sender: 'mask', content: '相信自己，你就是下一个闪亮的星！' },
    ],
  },
  {
    id: 17,
    name: '面具蟹',
    dialogue: [
      { sender: 'mask', content: '我戴着神秘的面具，隐藏着真实的自己...' },
      { sender: 'user', content: '为什么要戴面具呢？' },
      { sender: 'mask', content: '有时候，面具是保护，有时候，面具是束缚...' },
      { sender: 'user', content: '您想摘下面具吗？' },
      { sender: 'mask', content: '你愿意帮我找到真正的自己吗？' },
    ],
  },
  {
    id: 18,
    name: '小怂蟹',
    dialogue: [
      { sender: 'mask', content: '呜呜，我是胆小的小怂蟹...' },
      { sender: 'user', content: '别害怕，我会保护你的！' },
      { sender: 'mask', content: '虽然我很害怕，但我会努力变得勇敢！' },
      { sender: 'user', content: '你已经很勇敢了！' },
      { sender: 'mask', content: '你愿意和我一起面对恐惧吗？' },
    ],
  },
  {
    id: 19,
    name: '蟹妹妹',
    dialogue: [
      { sender: 'mask', content: '哥哥姐姐们好！我是可爱的蟹妹妹！' },
      { sender: 'user', content: '你好呀小妹妹！你想玩什么呢？' },
      { sender: 'mask', content: '我最喜欢和大家一起玩游戏啦！' },
      { sender: 'user', content: '我们会好好照顾你的！' },
      { sender: 'mask', content: '你们会保护我这个小妹妹吗？' },
    ],
  },
  {
    id: 20,
    name: '铜墙铁壁蟹',
    dialogue: [
      { sender: 'mask', content: '我是坚不可摧的铜墙铁壁蟹！' },
      { sender: 'user', content: '哇！您看起来很强大呢！' },
      { sender: 'mask', content: '我会用我的坚硬外壳保护所有的朋友！' },
      { sender: 'user', content: '那我们就很安全了！' },
      { sender: 'mask', content: '虽然我很坚强，但我的心是温柔的！' },
    ],
  },
  {
    id: 21,
    name: '胆小蟹',
    dialogue: [
      { sender: 'mask', content: '啊！不要吓我，我是胆小蟹...' },
      { sender: 'user', content: '别怕别怕，我不会吓你的！' },
      { sender: 'mask', content: '虽然我很胆小，但我会为朋友鼓起勇气！' },
      { sender: 'user', content: '你真的很勇敢呢！' },
      { sender: 'mask', content: '你愿意给我一些勇气吗？' },
    ],
  },
  {
    id: 23,
    name: '缪斯女神蟹',
    dialogue: [
      { sender: 'mask', content: '我是灵感的化身，缪斯女神蟹！' },
      { sender: 'user', content: '您能给我一些创作灵感吗？' },
      { sender: 'mask', content: '让我为你带来创作的灵感和艺术的美感！' },
      { sender: 'user', content: '我感受到了艺术的力量！' },
      { sender: 'mask', content: '每个人都有创造美好事物的能力！' },
    ],
  },
];
