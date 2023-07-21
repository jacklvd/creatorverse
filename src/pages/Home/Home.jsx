/* eslint-disable no-undef */
import Header from '../../components/Header.jsx'
import Cards from '../../components/Cards.jsx'
const Home = () => {

  return (
    <>
      <Header />
      <div className="sample-section-wrap">
        <div className="sample-section">
          <Cards />
        </div>
      </div>     
    </>
  );
};

export default Home;