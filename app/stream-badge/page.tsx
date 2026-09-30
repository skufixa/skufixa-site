import QRCode from "react-qr-code";
import styles from "./badge.module.css";

export default function StreamBadge() {
  // Потом сюда поставим настоящий адрес сайта
  const SITE_URL = "https://example.com";

  return (
    <main className={styles.overlay}>
      <div className={styles.float}>
        <div className={styles.scene}>
          <div className={styles.card}>

            {/* =========================
                СТОРОНА 1 — АВАТАРКА
            ========================== */}
            <div className={`${styles.face} ${styles.front}`}>
              <div className={styles.innerBorder} />

              {/* верхний декор */}
              <div className={styles.topDecor}>
                <span className={styles.sparkle}>✦</span>
                <span className={styles.topHeart}>♡</span>
                <span className={styles.sparkle}>✦</span>
              </div>

              {/* аватарка */}
              <div className={styles.avatarGlow}>
                <div className={styles.avatarFrame}>
                  <img
                    src="/avatar.jpg"
                    alt="skufixaa"
                    className={styles.avatar}
                  />
                </div>
              </div>

              {/* ник */}
              <div className={styles.nickname}>
                skufixaa <span>♡</span>
              </div>

              {/* подпись */}
              <div className={styles.subtitle}>
                STREAMER <b>•</b> CS2
              </div>

              {/* нижний декор */}
              <div className={styles.bottomDecor}>
                <span className={styles.line} />
                <span className={styles.bottomHeart}>♡</span>
                <span className={styles.line} />
              </div>

              <div className={styles.shine} />
            </div>


            {/* =========================
                СТОРОНА 2 — QR
            ========================== */}
            <div className={`${styles.face} ${styles.back}`}>
              <div className={styles.innerBorder} />

              {/* верхний декор */}
              <div className={styles.topDecor}>
                <span className={styles.sparkle}>✦</span>
                <span className={styles.topHeart}>♡</span>
                <span className={styles.sparkle}>✦</span>
              </div>

              {/* QR */}
              <div className={styles.qrOuter}>
                <div className={styles.qrBox}>
                  <QRCode
                    value={SITE_URL}
                    size={126}
                    bgColor="#ffffff"
                    fgColor="#151515"
                    level="H"
                  />
                </div>
              </div>

              {/* кнопка под QR */}
              <div className={styles.siteLabel}>
                <span>♡</span>
                МОЙ САЙТ
              </div>

              {/* нижний декор */}
              <div className={styles.bottomDecor}>
                <span className={styles.line} />
                <span className={styles.bottomHeart}>♡</span>
                <span className={styles.line} />
              </div>

              <div className={styles.shine} />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}