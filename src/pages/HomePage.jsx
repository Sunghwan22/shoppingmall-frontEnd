import { apiService } from '../services/APIService';

export default function HomePage() {
  const handleClickKakao = () => {
    apiService.testKakao();
  };

  return (
    <div>
      <p>Hello, world</p>
      <button
        onClick={handleClickKakao}
        type="button"
      >
        흐에!
      </button>
    </div>
  );
}
