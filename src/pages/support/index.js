import React, { useEffect, useState } from "react";
import Suport from './Support';
import { connect } from "react-redux";
import { API, API_ROUTER } from "../../api";
import { toast } from "react-toastify";

const SupportContainer = () => {

   useEffect(() => {

   }, []);

   function setSupportMessage(name, email, subject, description) {
      API.request(
         {
            ...API_ROUTER.support,
            data: {
               name: name,
               email: email,
               subject: subject,
               description: description,
               clientId: '01G4MA8V8RT7BFKKZ7N5E8YVAE',
            }
         },
      )
         .then((data) => {
            console.log(data)
         })
         .catch((err) => console.log(err));
   }


   return (
      <>
         <Suport setSupportMessage={setSupportMessage} />
      </>
   );
};

const mapStateToProps = (state) => {
   return {
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportContainer);