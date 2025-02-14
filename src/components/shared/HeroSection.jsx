
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap'; // Import Carousel
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import myroom3 from '@/assets/myroom3.jpg'; // Import images
// import myroom2 from '@/assets/myroom2.jpg';
// import job3 from '../assets/job3.jpg';
// import job2 from '../assets/job2.jpg';
// import job1 from '../assets/job1.jpg';

import job3 from '../assets/job3.jpg';
import job2 from '../assets/job2.jpg';
import job1 from '../assets/job1.jpg';


const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p>
                    Starting a new job can be nerve-racking, but it's also exciting.<br />
                    You're embarking on a new future, positioning yourself to write a fresh story on a clean slate.
                </p>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                {/* Carousel Component */}
                {/* <Carousel interval={3000}>
                    <Carousel.Item>
                        <img className="d-block w-100 carousel-image" src={job3} alt="First slide" />
                        <Carousel.Caption>
                            <h3>Secure Document Sharing</h3>
                            <p>Experience the power of seamless and secure document sharing.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100 carousel-image" src={job1} alt="Second slide" />
                        <Carousel.Caption>
                            <h3>End-to-End Encryption</h3>
                            <p>Your documents are protected with state-of-the-art encryption technology.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100 carousel-image" src={job2} alt="Third slide" />
                        <Carousel.Caption>
                            <h3>Trusted Platform</h3>
                            <p>We are committed to providing the most secure platform for document sharing.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel> */}
            </div>
        </div>
    );
};

export default HeroSection;
