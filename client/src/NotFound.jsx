import Header from './components/Header';
import Footer from './components/Footer';

const NotFound = ({ user, setUser }) => (
  <>
    <Header user={user} setUser={setUser} />
    <div>
      <h1 className="text-center py-5">404 Page Not Found</h1>
    </div>
    <Footer />
  </>
);

export default NotFound;
