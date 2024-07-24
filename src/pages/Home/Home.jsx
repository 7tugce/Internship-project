import React from "react";
import Sketch from "../../components/Sketch/Sketch";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <form className="form">
        <div className="first-section">
          <div className="labels">
            <label>Tarih</label>
            <label>Sunulan Kişi</label>
            <label>Unvan/Rol</label>
          </div>

          <div className="inputs">
            <input></input>
            <input></input>
            <input></input>
          </div>

          <div className="form-logo">Beko</div>
        </div>
        <hr />
        <h3 className="input-h3">Gereksinimler</h3>
        <hr />
        <p>Temelde bu yazılımın/hizmetin çözmeyi amaçladığı sorunu veya geliştirmeyi amaçladığı fırsatı maddelerle açıklayın</p>
        <textarea></textarea>

        <hr />
        <h3 className="input-h3">Mevuct Durum</h3>
        <hr />
        <p>Temelde şu anki durumu maddelerle açıklayın</p>
        <textarea></textarea>


        <hr />
        <h3 className="input-h3">Sınırlamalar</h3>
        <hr />
        <p>Pahalı ekipman ihtiyacı, özel eğitim eksikliği, bütçe eksikliği vb. gibi projenin başarısını engelleyebilecek şeyleri listeleyin</p>
        <textarea></textarea>


        <hr />
        <h3 className="input-h3">Yaklaşım</h3>
        <hr />
        <p>Projeyi tamamlamak için gerekli olan şeyleri listeleyin</p>
        <textarea></textarea>

        <hr />
        <h3 className="input-h3">Kazanımlar</h3>
        <hr />
        <p>Bu projenin kuruma ne tür katkısı olacağını maddelerle açıklayın</p>
        <textarea></textarea>

        <hr />
        <h3>Lütfen projenizin çizimini yapın</h3>
        <hr />
        <Sketch />
      </form>
    </div>
  );
};

export default Home;
