import React, { useEffect, useState } from "react";
import { Modal } from "../../components/UI";
import { Styled } from "../../components/auth-modal/style";
import { FormattedMessage } from "react-intl";
import { hideQrModal } from "../../redux/actions";
import { connect } from "react-redux";
import qr from "../../assets/images/qr-code.png";
import owl from "../../assets/images/owl-eye.png";
import Dashboard from "./Dashboard";
import { API, API_ROUTER } from "../../api";
import { TEAM_GAMES } from "../../config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Team = ({ showQrModal, dispatchHideQrModal, userData, ...rest }) => {
  const { match } = rest;
  const [team, setTeam] = useState(null);
  const [qr, setQr] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const { teamId } = match.params;

  // const { id } = useParams();
  console.log(teamId);

  useEffect(() => {
    getQR();
  }, []);

  function getQR() {
    API.request({
      ...API_ROUTER.getTeamQR,
      pathKeys: {
        teamId: teamId,
      },
    })
      .then((res) => {
        console.log(res);
        setQr(res);
      })
      .catch((err) => console.log(err));
  }
  // function getData() {
  //   API.request(
  //     {
  //       ...API_ROUTER.teams.getTeamDetails,
  //       pathKeys: {
  //         teamId: teamId,
  //       },
  //     },
  //     true
  //   )
  //     .then((data) => {
  //       setTeam(data);
  //     })
  //     .then((res) => {
  //       setQr(res);
  //     })
  //     .catch((err) => console.log(err));
  // }
  console.log(team, "dasdas");
  function getData() {
    API.request(
      {
        ...API_ROUTER.teams.getTeamDetails,
        pathKeys: {
          teamId: teamId,
        },
      },
      true
    )
      .then((data) => {
        setTeam(data);
      })
      .catch((err) => {
        if (!teamId) {
          toast.error("Unable to load team data without team id");
        }
        toast.error(err.data && err.data.message);
      });
  }

  function isCreator() {
    return (
      team?.createdBy?.username &&
      userData?.username &&
      team?.createdBy?.username === userData?.username
    );
  }
  return (
    <>
      <Dashboard teamId={teamId} {...rest} team={team} isCreator={isCreator} />

      <Modal
        className="modal__wrapper"
        isTransparent={true}
        open={showQrModal}
        onClose={dispatchHideQrModal}
      >
        <div className="modal">
          <img className="qr__owl-eye" src={owl} alt="owl-eye" />
          <p className="qr__title">Team id Card</p>
          <div className="qr">
            <img className="qr__img" src={qr.url} alt="QR code" />
          </div>
          <Styled.ButtonHolder>
            <button className="qr__hide-qr" onClick={dispatchHideQrModal}>
              <FormattedMessage id="gamer.id.card.btn.close" />
            </button>
          </Styled.ButtonHolder>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    showQrModal: state.showQrModal,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchHideQrModal: () => dispatch(hideQrModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);