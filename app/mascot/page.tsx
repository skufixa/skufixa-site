"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./mascot.module.css";

type MascotState =
  | "idle"
  | "happy"
  | "dead"
  | "panic"
  | "ez"
  | "sleep"
  | "pet";

export default function MascotPage() {
  const [state, setState] = useState<MascotState>("idle");
  const [mental, setMental] = useState(70);
  const [debug, setDebug] = useState(false);

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDebug(params.get("debug") === "1");

    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  function changeState(
    nextState: MascotState,
    duration = 3000
  ) {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    setState(nextState);

    // sleep и dead пока оставляем лежать,
    // остальные реакции возвращаются в idle
    if (nextState !== "sleep" && nextState !== "dead") {
      resetTimer.current = setTimeout(() => {
        setState("idle");
      }, duration);
    }
  }

  function addMental(amount: number) {
    setMental((current) =>
      Math.max(0, Math.min(100, current + amount))
    );
  }

  function handleKill() {
    addMental(4);
    changeState("happy", 2400);
  }

  function handleDeath() {
    addMental(-8);
    changeState("dead");
  }

  function handleLowHp() {
    addMental(-3);
    changeState("panic", 3500);
  }

  function handleEz() {
    addMental(6);
    changeState("ez", 3500);
  }

  function handlePet() {
    addMental(2);
    changeState("pet", 3000);
  }

  function handleSleep() {
    changeState("sleep");
  }

  function handleWakeUp() {
    changeState("idle");
  }

  return (
    <main className={styles.page}>
      <div className={styles.overlayArea}>
        <div
          className={`${styles.mascot} ${styles[state]}`}
          data-state={state}
        >
          {/* эффект под персонажем */}
          <div className={styles.shadow} />

          {/* HEARTS */}
          <div className={styles.hearts}>
            <span>♡</span>
            <span>♥</span>
            <span>♡</span>
          </div>

          {/* EZ */}
          <div className={styles.ezBubble}>
            EZ
          </div>

          {/* SKILL ISSUE */}
          <div className={styles.deadBubble}>
            skill issue
          </div>

          {/* ZZZ */}
          <div className={styles.zzz}>
            <span>z</span>
            <span>Z</span>
            <span>Z</span>
          </div>

          {/* тело */}
          <div className={styles.body}>

            {/* задние ушки */}
            <div className={`${styles.ear} ${styles.earLeft}`}>
              <div className={styles.earInner} />
            </div>

            <div className={`${styles.ear} ${styles.earRight}`}>
              <div className={styles.earInner} />
            </div>

            {/* голова */}
            <div className={styles.head}>

              {/* волосы */}
              <div className={styles.hair}>
                <span className={styles.hair1} />
                <span className={styles.hair2} />
                <span className={styles.hair3} />
                <span className={styles.hair4} />
              </div>

              {/* крестик */}
              <div className={styles.hairClip}>
                ×
              </div>

              {/* глаза */}
              <div className={`${styles.eye} ${styles.eyeLeft}`}>
                <div className={styles.eyeHighlight} />
              </div>

              <div className={`${styles.eye} ${styles.eyeRight}`}>
                <div className={styles.eyeHighlight} />
              </div>

              {/* щёки */}
              <div className={`${styles.cheek} ${styles.cheekLeft}`} />
              <div className={`${styles.cheek} ${styles.cheekRight}`} />

              {/* лицо */}
              <div className={styles.nose}>•</div>

              <div className={styles.mouth}>
                ︶
              </div>

              {/* слёзы при panic */}
              <div className={`${styles.tear} ${styles.tearLeft}`} />
              <div className={`${styles.tear} ${styles.tearRight}`} />
            </div>

            {/* футболка */}
            <div className={styles.shirt}>
              <div className={styles.shirtNeck} />

              <div className={styles.thrasher}>
                THRASHER
              </div>

              <div className={styles.shirtSub}>
                MAGAZINE
              </div>
            </div>

            {/* руки */}
            <div className={`${styles.arm} ${styles.armLeft}`} />
            <div className={`${styles.arm} ${styles.armRight}`} />

            {/* ножки */}
            <div className={`${styles.foot} ${styles.footLeft}`}>
              <span />
              <span />
              <span />
            </div>

            <div className={`${styles.foot} ${styles.footRight}`}>
              <span />
              <span />
              <span />
            </div>
          </div>

          {/* рука гладит */}
          <div className={styles.petHand}>
            <div className={styles.handPalm} />
            <div className={styles.handFinger} />
          </div>

          {/* MENTAL */}
          <div className={styles.mental}>
            <div className={styles.mentalTop}>
              <span>MENTAL ♡</span>
              <strong>{mental}%</strong>
            </div>

            <div className={styles.mentalTrack}>
              <div
                className={styles.mentalFill}
                style={{ width: `${mental}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ТЕСТОВАЯ ПАНЕЛЬ.
          В OBS её не будет. */}
      {debug && (
        <section className={styles.debugPanel}>
          <div className={styles.debugTitle}>
            Mascot test
          </div>

          <div className={styles.buttons}>
            <button onClick={() => changeState("idle")}>
              IDLE
            </button>

            <button onClick={handleKill}>
              KILL
            </button>

            <button onClick={handleDeath}>
              DEATH
            </button>

            <button onClick={handleLowHp}>
              LOW HP
            </button>

            <button onClick={handleEz}>
              MULTIKILL
            </button>

            <button onClick={handlePet}>
              !PET
            </button>

            <button onClick={handleSleep}>
              SLEEP
            </button>

            <button onClick={handleWakeUp}>
              WAKE UP
            </button>
          </div>

          <div className={styles.debugMental}>
            Mental: {mental}%
          </div>
        </section>
      )}
    </main>
  );
}