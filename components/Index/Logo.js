import React from 'react';

const Logo = () => {
    return ( <>
        <header className='Header'>
            <h1>
                center
                <div><span>it</span></div>
            </h1>
        </header>
        <style jsx>{`
            .Header {
                width: min-content;
                margin: 3rem auto 5rem auto;
            }
              
            .Header h1 {
                color: #1C1C1D;
                font-size: 6rem;
                
                letter-spacing: .5rem;
                text-align: center;
            }
              
            .Header h1 div {
                width: 100%;
                background-color: #1C1C1D;
                color: #fff;
                border-radius: 3px;
                position: relative;
            }

            .Header h1 div span {
                display: inline-block;
                margin: 0 auto;
                animation: .7s slideRight .75s;
                animation-fill-mode: backwards;
            }

            @keyframes slideRight {
                0% {
                    opacity: 0;
                    transform: translateX(-120%);
                }

                80% {
                    transform: translateX(10px);
                }
                100% {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `}</style>
    </>)
}

export default Logo;