import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

const profilePicSrc =
  "https://static-cdn.jtvnw.net/jtv_user_pictures/d9c9e795-2662-4a3b-bc42-42c97638f7af-profile_image-70x70.png";

const BUTTON_TEXT = {
  ready: "Convert",
  done: "Copied to Clipboard!",
};

const convert = (wordleOutput, wrong, near, perfect) => {
  return wordleOutput
    .replaceAll("⬛", wrong)
    .replaceAll("🟨", near)
    .replaceAll("🟩", perfect);
};

export default function Home() {
  const [wordleOutput, setWordleOutput] = useState("");
  const [wrong, setWrong] = useState(":black_large_square:");
  const [near, setNear] = useState(":yellow_square:");
  const [perfect, setPerfect] = useState(":green_square:");
  const [buttonText, setButtonText] = useState(BUTTON_TEXT.ready);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [conversion, setConversion] = useState("");
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    const newConversion = convert(wordleOutput, wrong, near, perfect);
    if (
      wordleOutput.length > 0 &&
      wrong.length > 0 &&
      near.length > 0 &&
      perfect.length > 0
    ) {
      setButtonDisabled(false);
      if (newConversion !== conversion) {
        setConversion(newConversion);
        setPreview(newConversion.split("\n"));
        setButtonText(BUTTON_TEXT.ready);
      }
    } else {
      setButtonDisabled(true);
    }
  }, [conversion, near, perfect, wordleOutput, wrong]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(conversion);
    setButtonText(BUTTON_TEXT.done);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Wordle Converter</title>
        <meta
          name="description"
          content="Convert your Wordle report to custom emoji"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a
            href="https://www.powerlanguage.co.uk/wordle/"
            target="_blank"
            rel="noreferrer"
          >
            Wordle
          </a>{" "}
          Converter
        </h1>

        <p className={styles.description}>
          Replace the emoji in the Wordle output with your own emoji (or just
          about anything)
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Wordle Output (Paste here)
            <textarea
              rows={10}
              cols={12}
              value={wordleOutput}
              onChange={(e) => setWordleOutput(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            ⬛ Replacement for Wrong
            <input
              type="text"
              value={wrong}
              onChange={(e) => setWrong(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            🟨 Replacement for Near
            <input
              type="text"
              value={near}
              onChange={(e) => setNear(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            🟩 Replacement for Perfect
            <input
              type="text"
              value={perfect}
              onChange={(e) => setPerfect(e.target.value)}
            />
          </label>
          <input
            type="submit"
            value={buttonText}
            disabled={buttonDisabled}
            className={styles.button}
          />
        </form>

        <p className={styles.preview}>
          {preview.map((line, index) => {
            return (
              <span key={`preview-line-${index}`}>
                {line}
                <br />
              </span>
            );
          })}
        </p>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerSubsection}>
          <a
            href="https://www.twitter.com/radiantgardnrs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.logo}>
              <Image
                src={profilePicSrc}
                alt="Radiant Gardeners profile picture"
                width={64}
                height={64}
              />
            </span>
          </a>
          Made by: Radiant Gardeners
        </div>
        <div className={styles.footerSubsection}>
          <a
            href="https://www.twitch.tv/radiantgardeners"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={"/logo-twitch.svg"}
              alt="twitch"
              width={32}
              height={32}
            />
          </a>
          <a
            href="https://www.youtube.com/radiantgardeners"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={"/logo-youtube.svg"}
              alt="youtube"
              width={32}
              height={32}
            />
          </a>
          <a
            href="https://www.twitter.com/radiantgardenrs"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={"/logo-twitter.svg"}
              alt="twitter"
              width={32}
              height={32}
            />
          </a>
          <a
            href="https://www.instagram.com/radiantgardeners"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={"/logo-instagram.svg"}
              alt="instagram"
              width={32}
              height={32}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
