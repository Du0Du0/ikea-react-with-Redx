import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

function StoreName({ City, setCity, Index, setIndex }) {
	const [Weather, setWeather] = useState('');
	const [Icon, setIcon] = useState('');
	const [Temp, setTemp] = useState(0);
	const [value, onChange] = useState(new Date());
	const path = process.env.PUBLIC_URL;
	const pageBg = useRef(null);
	const banner = useRef(null);
	const storeList = useRef(null);

	//지점명: 영어 도시 이름 => 한글로 변경
	const getCityNameKo = useCallback((City) => {
		switch (City) {
			case 'Goyang-si':
				return '고양점';
			case 'Yongin':
				return '기흥점';
			case 'Gyeonggi-do':
				return '광명점';
			case 'Busan':
				return '동부산점';
			default:
				return null;
		}
	}, []);

	//지점명 :순서로 설정
	const getCityIndex = useCallback(
		(City) => {
			switch (City) {
				case 'Goyang-si':
					return setIndex(0);
				case 'Yongin':
					return setIndex(1);
				case 'Gyeonggi-do':
					return setIndex(2);
				case 'Busan':
					return setIndex(3);
				default:
					return null;
			}
		},
		[setIndex]
	);

	//openWeather api 데이터 가져오기
	const fetchWeather = useCallback(async () => {
		let cityName = City;
		const apiKey = '3bc1f51ea0960a95958152e47fb71800';
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

		try {
			const result = await axios.get(url);
			setCity(result.data.name);
			setWeather(result.data.weather[0].main);
			setIcon(result.data.weather[0].icon);
			setTemp(result.data.main.temp + '℃');
		} catch (error) {
			console.error('Error fetching weather:', error);
		}
	}, [setCity, City]);

	useEffect(() => {
		fetchWeather();
		getCityIndex(City);
	}, [City, setCity, Index, setIndex, fetchWeather, getCityIndex]);

	useEffect(() => {
		pageBg.current.classList.add('on');
		banner.current.classList.add('on');
		storeList.current.classList.add('on');
	}, []);

	//휴점
	const holidayMarks = ['11-07-2023'];

	//연장영업
	const openLongMarks = [
		'01-07-2023',
		'02-07-2023',
		'07-07-2023',
		'08-07-2023',
		'09-07-2023',
		'15-07-2023',
		'15-07-2023',
		'16-07-2023',
		'21-07-2023',
		'22-07-2023',
		'23-07-2023',
		'29-07-2023',
		'30-07-2023',
	];

	return (
		<>
			<div className='topBgWrap'>
				<img src={path + '/img/ikeaBuilding.png'} className='back' ref={pageBg} alt='' />
			</div>

			<div className='topPopUp'>
				{/* 상단 안내 소개 배너*/}
				<div className='upperBanner' ref={banner}>
					<p>점포 안내</p>
				</div>

				{/* 상단 매장지점 정보란 / 스케쥴 / 달력 표시 */}
				<div className='storeListContainer' ref={storeList}>
					<div className='leftContainer'>
						<div className='storeNameWrap'>
							<h2>{getCityNameKo(City)}</h2>
							<select
								name='storeName'
								id='storeName'
								onChange={(e) => {
									setCity(e.target.value);
								}}
							>
								<option value='Goyang'>고양점</option>
								<option value='Yongin'>기흥점</option>
								<option value='Gyeonggi-do'>광명점</option>
								<option value='Busan'>동부산점</option>
							</select>
						</div>
						<div className='weatherWrap'>
							{/* {Weather} */}
							<img src={` https://openweathermap.org/img/wn/${Icon}@2x.png`} alt='weatherIcon' />
							<div className='temperature'>
								<p>{Temp}</p>
							</div>
						</div>
						<div className='selectStoreDesc'>
							<p>
								오늘은 10:30부터 20:00까지
								<br /> 정상 영업합니다.
							</p>
						</div>
					</div>

					<div className='middleContainer'>
						<ul>
							<li>
								<FontAwesomeIcon icon={faPhone} className='fontAwesomeIcon' />
								1670-4532
							</li>
							<li>
								<FontAwesomeIcon icon={faClock} className='fontAwesomeIcon' />
								정상영업 10:30 ~ 20:00
							</li>
							<li>
								<FontAwesomeIcon icon={faClock} className='fontAwesomeIcon' />
								연장영업 10:30 ~ 20:30
							</li>
						</ul>
						<button>
							<a href='#' target='_blank' rel='noopener noreferrer'>
								쇼핑 정보 바로가기
							</a>
						</button>
					</div>

					<div className='rightContainer'>
						<Calendar
							onChange={onChange}
							value={value}
							locale='en-EN'
							formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
							selectRange={false}
							next2Label={null}
							prev2Label={null}
							showNeighboringMonth={false}
							tileClassName={({ date, view }) => {
								if (holidayMarks.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
									return 'highlight';
								} else if (openLongMarks.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
									return 'openLong';
								}
							}}
						/>
						<div className='dateDesc'>
							<ul>
								<li>휴점</li>
								<li>연장영업</li>
								<li>오늘</li>
							</ul>
						</div>
					</div>
				</div>

				{/* 하단 요약 배너 */}
				<div className='descBanner'>
					<Link to='/'>
						<p>HOME</p>
					</Link>
					/<p>점포안내</p>/<p>{getCityNameKo(City)}</p>/<p>한눈에 보기</p>
				</div>
			</div>
		</>
	);
}

export default StoreName;
