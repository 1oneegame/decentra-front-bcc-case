"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavigationBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY < 10) {
                setIsVisible(false);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(true);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const links = [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Analyze",
            href: "/analyze",
        }
    ]
    
    return (
        <nav className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 mx-auto px-6 py-2 bg-white border border-gray-200 rounded-none w-fit shadow-sm transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-20'
        }`}>
            <div className="flex justify-center items-center gap-6">
                {links.map((link) => (
                    <div className="flex items-center" key={link.href}>
                        <Link href={link.href} className="text-slate-900 hover:text-blue-800 hover:bg-blue-50/50 rounded-none transition-all duration-300 px-4 py-1 text-md">{link.title}</Link>
                    </div>
                ))}
            </div>
        </nav>
    );
}