import FileUpload from '../src/app/components/FileUpload';
import FileList from '../src/app/components/FileList';

const Home = () => {
  return (
    <div>
      <h1>myDrive</h1>
      <FileUpload />
      <FileList />
    </div>
  );
};

export default Home;
