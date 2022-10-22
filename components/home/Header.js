import Head from "next/head";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MovieImg = styled.img`
display: block;
border: none;
position: absolute;
right: 0;
height: 100%;
min-height: 500px;
filter: drop-shadow(2px 4px 6px black);
// object-fit:cover;
// width:100%;
// background: linear-gradient(rgb(0 0 0 / 62%),rgb(0 0 0)) ,url(https://i.pinimg.com/originals/fb/66/f3/fb66f302df4d89b9b34a7ed21469e559.jpg)no-repeat;
//     background-position: 49% 22%;
}
  
    
  }
`;
const HeaderContainer = styled.div`
    display: block;
    width: 100%;
    height: 100vh;
    min-height: 500px;
    overflow: hidden;
}
  
    
  }
`;

const Header = () => {
  const {theme} = useSelector(state => state)
  return (
    <HeaderContainer>
      <div className="h-full">
        {/* <MovieImg src="" alt="Picture of the author" /> */}
        <div className={`relative h-full ${theme.text.selected} flex w-full flex-col justify-center max-w-sm lg:max-w-3xl mx-auto gap-6`}>
          <h1 className="text-2xl xl:text-[4rem] leading-none font-bold text-center">
            Animex Stream Watch Free Anime Videos Enjoy your unlimited anime collection.
          </h1>
          <div>
            <p className="text-center text-gray-300 font-lighter lg:text-2xl">
              We are the definitive source for the best curated 720p / 1080p HD
              anime videos, viewable by mobile phone and tablet, for free.
            </p>
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
