import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./UserHeader.module.css";
import Avatar from "@/public/Avatar.png";

interface UserHeaderProps {
  user: {
    name: string;
  } | null;
  accountInfo: {
    companyLimit: number;
    usedCompanyCount: number;
  } | null;
  logout: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user, accountInfo, logout }) => {
  useEffect(() => {
    if (accountInfo) {
      localStorage.setItem("accountInfo", JSON.stringify(accountInfo));
    }
  }, [accountInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.accountInfo}>
        {accountInfo ? (
          <div className={styles.containerCompani}>
            <div className={styles.containerCompaniUseText}>
              Использовано компаний <span className={styles.usedCompanyCount}>{accountInfo.usedCompanyCount}</span>
            </div>
            <div className={styles.containerCompaniLimitText}>
              Лимит по компаниям <span className={styles.companyLimit}>{accountInfo.companyLimit}</span>
            </div>
          </div>
        ) : (
          <div className={styles.usedCompanyCount}>Не удалось получить информацию об аккаунте</div>
        )}
      </div>
      <div className={styles.userAvatarContainer}>
        <div className={styles.containerText}>
          <div className={styles.textName}>{user?.name || "Алексей А."}</div>
          <div className={styles.textLogout} onClick={logout}>
            Выйти
          </div>
        </div>
        <Image src={Avatar} alt="Avatar" width={32} height={32} />
      </div>
    </div>
  );
};

export default UserHeader;
