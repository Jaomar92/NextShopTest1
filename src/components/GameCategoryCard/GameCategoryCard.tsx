import { FC } from "react";
import gameCategoryCardClassNames from "./gameCategoryClassNames";
import Link from "next/link";
import Image from "next/image";

interface GameCategoryCardProps {
  categoryImage: string;
  categoryName: string;
  slug: string;
}

const GameCategoryCard: FC<GameCategoryCardProps> = (props) => {
  const { categoryImage, categoryName, slug } = props;
  const { image, name, container, arrow } = gameCategoryCardClassNames;
  return (
    <>
      <Link href={`categories/${slug}`} className={container}>
        <Image
          src={categoryImage}
          alt={categoryName}
          height={200}
          width={200}
          className={image}
        />
        <div className=" flex flex-col items-center justify-center gap-2">
          <h3 className={name}>{categoryName}</h3>
          <Image
            src="/images/arrow.svg"
            alt="view"
            height={30}
            width={30}
            className={arrow}
          />
        </div>
      </Link>
    </>
  );
};

export default GameCategoryCard;
