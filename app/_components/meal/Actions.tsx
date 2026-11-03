import { buttonClasses } from "@/app/styles";

type ActionProps = {
  youtube: string | null;
  source: string | null;
};

export default function Actions({ youtube, source }: ActionProps) {
  return (
    <>
      {youtube && (
        <a
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("primary")}
        >
          Watch on YouTube
        </a>
      )}
      {source && (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("secondary")}
        >
          Original recipe
        </a>
      )}
    </>
  );
}
