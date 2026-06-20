'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  FaPlane,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';

import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdArrowOutward,
} from 'react-icons/md';

const Footer = () => {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');

  const links = [
    { href: 'aboutUs', label: t('company.about') },
    { href: '#', label: t('company.order') },
    { href: '#', label: t('company.contact') },
    { href: '#', label: t('company.faq') },
  ];

  const legalLinks = [
    { href: 'termsandconditions', label: t('legal.terms') },
    { href: 'privacypolicy', label: t('legal.privacy') },
    { href: '#', label: t('legal.cookies') },
    { href: '#', label: t('legal.developers') },
  ];

  const socialLinks = [
    { href: '#', icon: FaFacebookF, label: 'Facebook' },
    { href: '#', icon: FaTwitter, label: 'Twitter' },
    { href: 'https://www.linkedin.com/company/tayyran/posts/?feedView=all', icon: FaLinkedinIn, label: 'LinkedIn' },
    { href: '#', icon: FaYoutube, label: 'YouTube' },
    { href: '#', icon: FaInstagram, label: 'Instagram' },
  ];

  return (
    <footer className="relative bg-gradient-to-b  from-primary to-primary/90 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

            {/* LOGO + DESC */}
            <div className="col-span-4 lg:col-span-4 flex flex-col items-center md:block">
              <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                <Image
                  src="/white-logo.jpg"
                  alt=""
                  width={100}
                  height={100}
                  unoptimized
                  className="rounded-2xl w-36  mr-3 object-contain brightness-0 invert"
                />
              </Link>

              <p className="text-white/70 leading-relaxed mb-8 text-sm">
                {t('description')}
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-200"
                  >
                    <social.icon className="w-5 h-5 text-white/70 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>


            {/* COMPANY */}
            <div className="col-span-2 lg:col-span-2">
              <h3 className="text-md font-bold uppercase mb-6 tracking-wide text-white/90">
                {t('titles.company')}
              </h3>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 group">
                      <MdArrowOutward className="text-secondary w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div className="col-span-2 lg:col-span-3">
              <h3 className="text-md font-bold uppercase mb-6 tracking-wide text-white/90">
                {t('titles.legal')}
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 group">
                      <MdArrowOutward className="text-secondary w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="col-span-3 lg:col-span-3">
              <h3 className="text-md font-bold uppercase mb-6 tracking-wide text-white/90">
                {t('titles.contact')}
              </h3>

              <ul className="space-y-4 text-white/70">

                <li className="flex gap-3 items-start group">
                  <div className="bg-secondary/20 p-2 rounded-lg group-hover:bg-secondary/30 transition-colors duration-200">
                    <MdEmail className="text-secondary text-xl" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">{t('contact.email')}</p>
                    <p className="text-sm text-white/90">info@yanaholidays.com</p>
                  </div>
                </li>

                <li className="flex gap-3 items-start group">
                  <div className="bg-secondary/20 p-2 rounded-lg group-hover:bg-secondary/30 transition-colors duration-200">
                    <MdPhone className="text-secondary text-xl" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">{t('contact.phone')}</p>
                    <p className="text-sm text-white/90">966xxxxxxx</p>
                  </div>
                </li>

                <li className="flex gap-3 items-start group">
                  <div className="bg-secondary/20 p-2 rounded-lg group-hover:bg-secondary/30 transition-colors duration-200">
                    <MdLocationOn className="text-secondary text-xl" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">{t('contact.location')}</p>
                    <p className="text-sm text-white/90">{t('contact.country')}</p>
                  </div>
                </li>

              </ul>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/50">
            © {new Date().getFullYear()} Tayyran. {t('copyright')}
          </p>

          <p className="text-white/50">
            {t('poweredBy')}{' '}
            <Link href="https://7armstech.com" className="text-secondary font-semibold hover:text-white transition-colors duration-200">
              7armsTech
            </Link>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;