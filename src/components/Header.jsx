import styles from '../../styles/header.module.scss';
import Image from "next/image";
import Connexion from './Connexion';

import { MenuIcon, UserCircleIcon, SearchIcon, UserIcon, UsersIcon } from "@heroicons/react/solid";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

export default function Header({ placeholder }) {

  const [showConnexion, setShowConnection] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [numOfGuests, setNumOfGuests] = useState(1);
  const router = useRouter();

  const toggleConnexion = () => {
    setShowConnection(!showConnexion)
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const goToSearchPage = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests, 
      }
    });


    /*
    const queryParams = new URLSearchParams({
      location: searchInput,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      numOfGuests,
    });
    console.log(queryParams.toString());
    navigate({
      pathname: "/search",
      search: queryParams.toString(),
    });
    */
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handleInputClick = (event) => {
    if (
      event.target.name === "checkInInput" ||
      event.target.name === "checkOutInput"
    ) {
      setIsInputClicked(true);
    } else {
      setIsInputClicked(false);
    }
  };

  return (
    <header className={styles.header}>
      <div>
        <Link href="/" target="noreferrer">
          <Image src="/images/logo.png" alt="logo" width={42} height={42} />
        </ Link>
        <div className={styles.sign_log_container} onClick={toggleConnexion}>
          <MenuIcon className="" />
          <UserCircleIcon className="" />
        </div>
        {showConnexion && <Connexion />}
      </div>

      <div className={styles.input_container}>
        <div className={styles.location}>
          <p>Location</p>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder={placeholder || "Where are you going?"}
          />
        </div>
        <div className={styles.check_in}>
          <p>Check in</p>
          <input
            name="checkInInput"
            onClick={handleInputClick}
            type="text"
            placeholder="Add dates"
          />
        </div>
        <div className={styles.check_out}>
          <p>Check out</p>
          <input
            name="checkOutInput"
            onClick={handleInputClick}
            type="text"
            placeholder="Add dates"
          />
        </div>
        <div className={styles.guests}>
          <p>Guests</p>
          <input type="text" placeholder="Add guests" />
          <span>
            <i className="lni lni-search-alt"></i>
          </span>
        </div>
      </div>

      {searchInput && isInputClicked && (
        <div className={styles.date_range_picker}>
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div>
            <h2>Number of Guests</h2>
            <UsersIcon className="" />
            <input type="number" min={1}
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(e.target.value)} />
          </div>

          <div>
            <button onClick={resetInput}>Cancel</button>
            <button onClick={goToSearchPage}>Search</button>
          </div>
        </div>
      )}
    </header>
  );
}
