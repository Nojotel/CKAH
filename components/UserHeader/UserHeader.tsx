import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./UserHeader.module.css";
import loaderStyles from "@/components/Loader/LoaderHeader.module.css";
import Avatar from "@/public/Avatar.png";
import MDSpinner from "react-md-spinner";
import { UserHeaderProps } from "@/types/types";

const UserHeader: React.FC<UserHeaderProps> = ({ user, accountInfo, logout, isLoading }) => {
  const [isLoadingAccountInfo, setIsLoadingAccountInfo] = useState(false);

  useEffect(() => {
    setIsLoadingAccountInfo(true);
    const timeout = setTimeout(() => {
      setIsLoadingAccountInfo(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    localStorage.removeItem("accountInfo");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.accountInfo}>
        {isLoadingAccountInfo ? (
          <div className={loaderStyles.loaderContainer}>
            <MDSpinner />
          </div>
        ) : accountInfo ? (
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
