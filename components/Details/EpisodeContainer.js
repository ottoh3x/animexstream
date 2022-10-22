import { useSelector } from "react-redux";
import Link from "next/link";
import styled from "styled-components";

const EpButton = styled.div`
  border: 2px solid ${({ detailsButton }) => detailsButton.border};
  color: ${({ detailsButton }) => detailsButton.text};
  background: ${({ detailsButton }) => detailsButton.background};
  &:hover   {
    border: 2px solid ${({ detailsButton }) => detailsButton.hover.border};
    color: ${({ detailsButton }) => detailsButton.hover.text};
    background: ${({ detailsButton }) => detailsButton.hover.background};
  }
`;

const EpisodeContainer = ({ title, id, number, image }) => {
  var myArray = [];
  const myFunc = () => {
    for (let i = number; i >= 1; i--) {
      myArray.push(i);
    }
  };
  const theme = useSelector((state) => state.theme);
  return (
    <div className="w-full flex flex-col px-5 max-w-full p-[3rem] lg:px-20 pt-[2rem] ">
      <span
        className={`${theme.card.text} flex flex-col font-bold z-[1] text-3xl py-5`}
      >
        <span>{title}</span>
        <span className={"text-blue-500 text-lg"}>
          {number != 0 ? " 1 -" + " " + number: "Coming Soon"}
        </span>
      </span>
      <div className="flex m-w-[65rem] flex-wrap justify-center lg:place-content-start w-full max-h-[450px] overflow-y-scroll z-[1] gap-[1rem]">
        {
          (myFunc(),
          myArray.reverse().map((index) => (
            <Link key={index} href={`/watching/${id}/${index}`}>
              <EpButton
                className="flex cursor-pointer border-2 rounded-lg justify-center  gap-2 relative h-10 lg:h-[3rem] w-20 lg:w-[4rem] shadow-lg hover:scale-105 transition-transform transform duration-300"
                key={index}
                detailsButton={theme.detailsButton}
              >
                {/* <div className="rounded-full w-1/3 h-full p-1 shadow-2xl">
                  <img
                    src={image}
                    className="h-full rounded-full w-full  object-cover"
                    alt={id}
                  />
                </div> */}
                <span className="w-2/3 flex justify-center items-center text-center h-full ">
                  <span className={"font-semibold"}>{" " +index}</span>
                </span>
              </EpButton>
            </Link>
          )))
        }
      </div>
    </div>
  );
};

export default EpisodeContainer;
