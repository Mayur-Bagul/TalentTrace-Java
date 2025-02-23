


import React, { useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, MessageCircle } from 'lucide-react'; // Add the MessageCircle icon for chat
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    const logoutHandler = () => {
        localStorage.removeItem('user');
        dispatch(setUser(null));
        navigate('/');
        toast.success('You have successfully logged out.');
    };

    const userProfile = user?.profile || {};

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">
                        Talent<span className="text-[#F83002]">Trace</span>
                    </h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/companies">Companies</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                


                                {/* recruiter */}
                                <li><Link to="/jobs">Jobs</Link></li> 
                                <li><Link to="/companies">Companies</Link></li>
                                <li><Link to="/applicants">Applicants</Link></li>

                                <li><Link to="/">Log Out</Link></li>

                                {/* employee */}    
                                {/* <li><Link to="/user/Jobs">Application</Link></li> */}
                                {/* <li><Link to="/user/JobTable">AppliedJob</Link></li> */}
                                {/* <li><Link to="/appTable">AppTable</Link></li> */}
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/chat">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    Chat
                                </Button>
                            </Link>
                            {/* <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                                    Signup
                                </Button>
                            </Link> */}
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src={userProfile.profilePhoto || '/default-avatar.png'}
                                        alt="@shadcn"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>
                                    <div className="flex gap-2 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={userProfile.profilePhoto || '/default-avatar.png'}
                                                alt="@shadcn"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname || 'User'}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {userProfile.bio || 'No bio available'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        {user && user.role === 'student' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;


