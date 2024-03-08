import BasicComponent from "./BasicComponent";
import "./Organigramme.css";
function Organigramme() {
  return (
    <>
      <BasicComponent
        className="Organigramme"
        title="Organigramme"
        content={
          <div className="organigramme-schema">
            <div className="organigramme-row">
              <div className="organigramme-item">
                <img src="https://via.placeholder.com/150" alt="placeholder" />
                <div className="organigramme-item-title">President</div>
              </div>
            </div>
            <div className="organigramme-row">
              <div className="organigramme-item">
                <img src="https://via.placeholder.com/150" alt="placeholder" />
                <div className="organigramme-item-title">Vice-President</div>
              </div>
              <div className="organigramme-item">
                <img src="https://via.placeholder.com/150" alt="placeholder" />
                <div className="organigramme-item-title">Tresorier</div>
              </div>
            </div>
            <div className="organigramme-row">
              <div className="organigramme-item">
                <img src="https://via.placeholder.com/150" alt="placeholder" />
                <div className="organigramme-item-title">Secretaire</div>
              </div>
              <div className="organigramme-item">
                <img src="https://via.placeholder.com/150" alt="placeholder" />
                <div className="organigramme-item-title">
                  Responsable Communication
                </div>
              </div>
              <div className="organigramme-item">
                <img src="https://via.placeholder.com/150" alt="placeholder" />
                <div className="organigramme-item-title">Responsable Event</div>
              </div>
              <div className="organigramme-item">
                <img src="https://via.placeholder.com/150" alt="placeholder" />
                <div className="organigramme-item-title">
                  Responsable Sponsoring
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}

export default Organigramme;
