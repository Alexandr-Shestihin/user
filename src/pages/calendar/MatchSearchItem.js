import React from "react";

const MatchSearchItem = ({
  title,
  id,
  value,
  name,
  onClickFunction,
  modalWindow,
  ConstDataArr,
  changeFunction,
  changeName,
}) => {
  return (
    <div className="search-tournaments-form__search-month">
      <h4 className="search-month__title">{title}</h4>
      <article className="search-month__select">
        <input
          className="search-month__input"
          id={id}
          type="text"
          defaultValue={value}
          name={name}
        />
        <label
          className="search-month__input-label"
          htmlFor="match-search__month"
          onClick={() => onClickFunction("Open")}
        >
          {value}
        </label>
        {modalWindow !== null && (
          <ul className="search-month__select-list">
            {ConstDataArr.map((el) => (
              <li
                key={el.id}
                className="search-month__option"
                onClick={(e) => {
                  changeFunction(el.id ? el.id : el.month);
                  changeName(el.title);
                }}
                value={el.title}
              >
                {el.title}
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
};

export default MatchSearchItem;
