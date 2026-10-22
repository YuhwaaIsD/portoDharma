import {
  Code2,
  Layout,
  Server,
  Terminal,
  Cpu,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Quote,
} from "lucide-react";

export const personalInfo = {
  name: "Dharma Santoso",
  tagline:
    "Menggabungkan teknologi, desain, dan kreativitas untuk membangun pengalaman digital yang berdampak dan bermakna.",
  description:
    "Pelajar SMK jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) di SMKS Cinta Kasih Tzu Chi. Berpengalaman sebagai Web Developer dengan keahlian HTML, CSS, PHP, serta framework modern seperti Laravel, Bootstrap, dan TailwindCSS. Mendalami UI/UX design (Figma), fotografi, videografi, dan animasi 3D dasar (Blender). Penerima Beasiswa Teladan SMK Cinta Kasih Tzu Chi.",
  email: "dharmasantoso6@gmail.com",
  phone: "+6285827653860",
  linkedin: "https://www.linkedin.com/in/dharmasantoso",
  cvDriveLink: "https://bit.ly/SertifikatDharmaS",
};

export const educationInfo = {
  institution: "SMKS Cinta Kasih Tzu Chi — Jakarta, Indonesia",
  major: "Pengembangan Perangkat Lunak dan Gim (PPLG)",
  status: "Juli 2024 – Sekarang",
  details: [
    "Menguasai pengembangan web full-stack dengan PHP Laravel, Livewire, dan framework modern.",
    "Aktif mengikuti kompetisi nasional di bidang IT, AI, dan UI/UX design.",
    "Penerima Beasiswa Teladan SMK Cinta Kasih Tzu Chi T/A 2024/2025 dan 2025/2026.",
  ],
};

export const hardSkills = [
  {
    category: "PHP Ecosystem",
    skills: ["Laravel", "Livewire", "PHP", "Ajax JS"],
    icon: Server,
  },
  {
    category: "JS/TS Ecosystem",
    skills: ["ReactJS", "Next.js", "TypeScript", "TailwindCSS", "Bootstrap"],
    icon: Layout,
  },
  {
    category: "Systems & Tools",
    skills: ["C++", "Git", "GitLab", "WordPress CMS"],
    icon: Terminal,
  },
  {
    category: "Design & Media",
    skills: [
      "Figma",
      "Blender",
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "OBS Studio",
    ],
    icon: Cpu,
  },
];

export const softSkills = [
  "Public Speaking",
  "Kerja Tim & Kolaborasi",
  "Adaptif & Cepat Belajar",
  "Kepemimpinan Proyek",
  "UI/UX Thinking",
];

export type PortfolioCategory =
  | "Projects"
  | "Organizations"
  | "Experiences"
  | "Achievements";

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  tags: string[];
  link?: string;
  imageAccent?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "Axioo Class Program — SFI",
    category: "Projects",
    description:
      "Website berbasis PHP Laravel dan Livewire untuk Axioo Class Program, dikerjakan bersama tim menggunakan Git di GitLab. Melibatkan identifikasi dan perbaikan celah keamanan website.",
    tags: ["Laravel", "Livewire", "PHP", "Ajax JS", "Git"],
    link: "https://sfi.axiooclassprogram.org",
    imageAccent: "from-emerald-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "p2",
    title: "Berjaya Gemilang Teknik",
    category: "Projects",
    description:
      "Website untuk klien freelance — dirancang dan dibangun sesuai kebutuhan klien dengan UI/UX responsif dan user-friendly, dioptimalkan untuk performa dan keamanan.",
    tags: ["Web Development", "UI/UX", "Freelance"],
    link: "https://www.berjayagemilangteknik.com",
    imageAccent: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
  {
    id: "p3",
    title: "Portfolio Website",
    category: "Projects",
    description:
      "Website portfolio personal ini — dibangun dengan Next.js, TypeScript, dan TailwindCSS, menggunakan GSAP untuk animasi scroll yang halus dan responsif.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "GSAP"],
    link: "/",
    imageAccent: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    id: "o1",
    title: "Dewan Ambalan Pramuka SMK Cinta Kasih Tzu Chi",
    category: "Organizations",
    description:
      "Bendahara Dewan Ambalan, mengelola keuangan organisasi. Panitia Perjusa (Perkemahan Jumat Sabtu) divisi Sarana Prasarana — menyiapkan peralatan dan memastikan kelancaran acara.",
    tags: ["Kepemimpinan", "Manajemen Acara", "Bendahara"],
    imageAccent: "from-blue-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "o2",
    title: "Relawan Pendidikan Tzu Chi",
    category: "Organizations",
    description:
      "Mengedukasi anak-anak kurang beruntung di Pluit melalui pengajaran Bahasa Mandarin dan Kewarganegaraan. Bertugas sebagai MC dan pengajar tamu dalam kegiatan interaktif.",
    tags: ["Relawan", "Pendidikan", "Public Speaking"],
    imageAccent: "from-teal-500/20 via-emerald-500/10 to-transparent",
  },
  {
    id: "e1",
    title: "Website Developer — PT. Tera Data Indonusa Tbk",
    category: "Experiences",
    description:
      "Mengembangkan website berbasis PHP Laravel dan Livewire dengan kolaborasi tim via GitLab. Mengidentifikasi, melaporkan, dan memperbaiki celah keamanan. (Januari – Maret 2025)",
    tags: ["Laravel", "Livewire", "Ajax JS", "GitLab", "PHP"],
    link: "https://drive.google.com/file/d/1i3GTy9ZcHcLjnaijoqB_ZyFdVkeoKpZO/view?usp=sharing",
    imageAccent: "from-teal-500/20 via-emerald-500/10 to-transparent",
  },
  {
    id: "e2",
    title: "Freelance Web Developer",
    category: "Experiences",
    description:
      "Merancang dan membangun website sesuai kebutuhan klien dengan UI/UX responsif, minim revisi. Mengoptimalkan performa dan keamanan website. (September 2024 – Desember 2025)",
    tags: ["Freelance", "Web Development", "UI/UX", "Responsive"],
    link: "https://bit.ly/SertifikatDharmaS",
    imageAccent: "from-rose-500/20 via-pink-500/10 to-transparent",
  },
  {
    id: "a1",
    title: "Juara Terbaik UI/UX — Technofest Nasional",
    category: "Achievements",
    description:
      "Meraih penghargaan Best UI/UX Game Design di ajang Technofest Nasional yang diselenggarakan oleh Universitas Bunda Mulia, 2025.",
    tags: ["UI/UX", "Game Design", "Nasional"],
    link: "https://drive.google.com/file/d/1i3GTy9ZcHcLjnaijoqB_ZyFdVkeoKpZO/view?usp=sharing",
    imageAccent: "from-rose-500/20 via-violet-500/10 to-transparent",
  },
  {
    id: "a2",
    title: "Juara 4 KONEKSI AI Competition",
    category: "Achievements",
    link: "https://drive.google.com/file/d/1i3GTy9ZcHcLjnaijoqB_ZyFdVkeoKpZO/view?usp=sharing",
    description:
      "Meraih juara 4 pada KONEKSI AI Competition yang diselenggarakan oleh Axioo, 2025.",
    tags: ["AI", "Kompetisi", "Axioo"],
    imageAccent: "from-amber-500/20 via-yellow-500/10 to-transparent",
  },
  {
    id: "a3",
    title: "Juara Favorit 1 Video Arsitektur — Universitas Budi Luhur",
    category: "Achievements",
    description:
      "Meraih Juara Favorit 1 pada kompetisi Video Arsitektur Tingkat Nasional yang diselenggarakan oleh Universitas Budi Luhur, 2025.",
    tags: ["Videografi", "Editing", "Nasional"],
    link: "https://drive.google.com/file/d/1i3GTy9ZcHcLjnaijoqB_ZyFdVkeoKpZO/view?usp=sharing",
    imageAccent: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
];

export interface QuoteItem {
  id: string;
  text: string;
  author: string;
  title: string;
}

export const quoteItems: QuoteItem[] = [
  {
    id: "q1",
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    title: "Turing Award Winner & Computer Scientist",
  },
  {
    id: "q2",
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    title: "Author & Software Craftsman",
  },
  {
    id: "q3",
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    title: "Software Engineer & Author",
  },
];
