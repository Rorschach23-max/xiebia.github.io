import crabImg from '@/assets/crab.png';
import bilibiliSvg from '@/assets/svg/bilibili.svg';
import emailSvg from '@/assets/svg/email.svg';
import tiktokSvg from '@/assets/svg/tiktok.svg';
import avatar from '@/assets/wechat_avatar.jpg';
import React from 'react';
import styles from './Introduction.less';

const Introduction: React.FC = () => {
  const tiktokUrl =
    'https://www.douyin.com/user/MS4wLjABAAAAvalu_hcjFc_iuxQ5f8an4dkEXaJ3NhR9l3da9ROpu50csHmvC9RBSY9vLmvhBY8u?from_tab_name=main';
  const bilibiliUrl = 'https://space.bilibili.com/506649741';
  const emailUrl = '2234013995@qq.com';
  return (
    <div className={styles.introduction}>
      <div className={styles.introductionContent}>
        <img className={styles.crabImg} src={crabImg} alt="crabImg" />
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={styles.firstName}>XieBia</div>
        <div className={styles.secondName}>我是第一名</div>
        <div className={styles.saying}>Earth Needs Funny People😎!</div>
        <div className={styles.socialMedia}>
          <div className={styles.socialMediaItem} onClick={() => window.open(tiktokUrl)}>
            <img src={tiktokSvg} alt="tiktok" />
            <span>Tiktok</span>
          </div>
          <div className={styles.socialMediaItem} onClick={() => window.open(bilibiliUrl)}>
            <img style={{ width: '18px', height: '18px' }} src={bilibiliSvg} alt="bilibili" />
            <span>Bilibili</span>
          </div>
          <div className={styles.socialMediaItem} onClick={() => window.open(`mailto:${emailUrl}`)}>
            <img style={{ width: '16px', height: '16px' }} src={emailSvg} alt="email" />
            <span>Email</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
