import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appAction } from "../../store/appSlice";
import { uiAction } from "../../store/uiSlice";
import classes from "./SearchForm.module.css";
const SearchForm = (props) => {
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.app.users);
  const filteredUsers = users.filter((item) =>
    item.displayName.toLowerCase().includes(searchText.toLowerCase())
  );

  const userSearchHandler = (event) => {
    dispatch(uiAction.setIsSearch(true));
    setSearchText(event.target.textContent);
    setShow(!show);
  };

  const showHandler = () => setShow(true);

  useEffect(() => {
    dispatch(appAction.setFilteredUsers(filteredUsers));
  }, [searchText]);

  return (
    <div className={classes.search}>
      <input
        className={classes.input}
        id="search"
        type="text"
        placeholder="Search chat"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onClick={showHandler}
      />

      {searchText && show && (
        <ul className={classes.autocomplete}>
          {filteredUsers.map((item) => (
            <li key={item.uid} onClick={userSearchHandler}>
              {item.displayName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchForm;
