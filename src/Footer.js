import React from 'react';

function Footer() {
    return (
        <footer className="bg-customGreen text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} DocEase. All rights reserved.
                </p>
                <div className="mt-2">
                    <a href="https://www.example.com" className="text-gray-200 hover:text-white mx-2">Privacy Policy</a>
                    <a href="https://www.example.com" className="text-gray-200 hover:text-white mx-2">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
