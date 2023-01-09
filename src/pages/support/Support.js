import React, { useState } from "react";
import s from './suport.module.scss';

import Wrapper from "../../components/wrapper";

export default function Support(props) {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [subject, setSubject] = useState('');
   const [text, setText] = useState('');

   const changeInput = (value, fn) => {
      fn(value.target.value)
   }
   const send = () => {
      props.setSupportMessage(name, email, subject, text);
      setName('');
      setEmail('');
      setSubject('');
      setText('');
   }

   return (
      <Wrapper>
         <div className={s.supportContainer}>
            <div className={s.contentContainer}>
               <div className={s.titleSupport}>SUPPORT TICKET</div>
               <div className={s.inputContainert}>
                  <div className={s.titleInput}>Name*</div>
                  <input
                     value={name}
                     type="text"
                     onChange={(e) => changeInput(e, setName)}
                  />
               </div>
               <div className={s.inputContainert}>
                  <div className={s.titleInput}>Email*</div>
                  <input
                     value={email}
                     type="text"
                     onChange={(e) => changeInput(e, setEmail)}
                  />
               </div>
               <div className={s.inputContainert}>
                  <div className={s.titleInput}>Subject*</div>
                  <input
                     value={subject}
                     type="text"
                     onChange={(e) => changeInput(e, setSubject)}
                  />
               </div>
               <div className={s.inputContainert}>
                  <div className={s.titleInput}>Your message*</div>
                  <textarea
                     value={text}
                     type="text"
                     onChange={(e) => changeInput(e, setText)}
                  />
               </div>
               <button onClick={send}>SEND</button>
            </div>

         </div>
      </Wrapper>
   );
}

