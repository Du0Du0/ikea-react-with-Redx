import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import React from 'react';

function Promotion() {
	const path = process.env.PUBLIC_URL;
	const Promotion = useSelector((store) => store.promotionReducer.promotion);
	const dispatch = useDispatch();

	return (
		<section id='promotion' className='myScroll'>
			<div className='promotionContainer'>
				<img className='circleText' src={path + '/img/textCircle2.png'} alt='' />
				{/* promotion left side  */}
				<div className='promotionWrap'>
					<div className='top'>
						{/* ikea youtube embed video  */}
						<iframe
							src='https://www.youtube-nocookie.com/embed/_5SyZ0TXPH0?color=white&rel=0&modestbranding=1'
							title='YouTube video player'
							frameborder='0'
							showInfo='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							allowfullscreen
							playsinline
						></iframe>
					</div>
					<div className='down'>
						{/* imbed video description  */}
						<div className='downLeft'>
							<a href='#'>
								<h3>참나무 앞판을 사용한 포근한 주방</h3>
								<h2>VEDHAMN 베드함 참나무 주방 가이드</h2>
							</a>
						</div>
						{/* arrow button  */}
						<div className='downRight'>
							<a href='#'>
								<FontAwesomeIcon icon={faArrowRight} />
							</a>
						</div>
					</div>
				</div>

				{/* promotion 중앙 제목 영역  */}
				<div className='promotionWrap'>
					<h4>진행중이벤트</h4>
				</div>

				{/* promotion 오른쪽 sns 영역  */}
				<div className='promotionWrap'>
					<div className='sns'>
						{Promotion.map((promotion, idx) => {
							return (
								<React.Fragment key={idx}>
									<h3>{promotion.title}</h3>
									<h4>{promotion.content.length > 150 ? `${promotion.content}`.split(' ').splice(0, 43).join(' ') + '...' : promotion.content}</h4>
									<p>
										{promotion.date}ㆍ{promotion.user}
									</p>
									<br />
									<br />
								</React.Fragment>
							);
						})}
					</div>
					<div className='snsGoBtn'>
						<a href='#'>
							바로가기&nbsp;&nbsp;&nbsp; <FontAwesomeIcon icon={faArrowRight} />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Promotion;
