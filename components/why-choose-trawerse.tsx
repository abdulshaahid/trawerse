import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, Zap, Lock, Layers, Clock, Sparkles } from 'lucide-react'
import DisplayCards from '@/components/ui/display-cards'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faLaptopCode, faTerminal, faServer, faDatabase, faCodeBranch, faRocket, faClock } from '@fortawesome/free-solid-svg-icons'
import { AnimatedBeamMultipleOutputDemo } from '@/components/ui/animated-beam-demo'
import SystemMonitor from '@/components/ui/system-monitor'
import ScalabilityMetrics from '@/components/ui/scalability-metrics'
import { motion } from 'framer-motion'

export function WhyChooseTrawerse() {
    return (
        <section id="features" className="relative bg-gray-50 mt-12 py-16 md:py-32 dark:bg-transparent overflow-hidden">
            {/* Background animated blobs */}
            <motion.div 
                className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
                initial={{ opacity: 0, scale: 0.8 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <motion.div 
                className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
                initial={{ opacity: 0, scale: 0.8 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            />
            <div className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
                {/* Section Header */}
                <div className="mb-10 space-y-2">
                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold overflow-hidden"
                        initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.2
                        }}
                    >
                        <span className="bg-gradient-to-b from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
                            Why Choose{" "}
                        </span>
                        <span className="text-accent">
                            Trawerse
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-white/70 text-lg md:text-xl max-w-2xl"
                        initial={{ opacity: 0, x: -80, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.4
                        }}
                    >
                        At Trawerse, quality isn&apos;t a promise. It&apos;s our baseline.
                    </motion.p>
                </div>

                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-3 mx-2 sm:mx-0">
                        {/* Pixel-Perfect Design */}
                        <motion.div
                            className="relative col-span-full flex lg:col-span-2"
                            initial={{ y: 60, scale: 0.95, rotateX: 10 }}
                            whileInView={{ y: 0, scale: 1, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                        >
                            <Card className="relative w-full overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/[0.02] dark:bg-white/[0.02] border-white/5 group  transition-all duration-700" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                <CardContent className="relative m-auto w-full pt-6 pb-16">
                                    <motion.h2 
                                        className="text-2xl font-semibold text-center mb-2"
                                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        Pixel-Perfect
                                    </motion.h2>
                                    <motion.p 
                                        className="text-foreground/50 text-center mb-8"
                                        initial={{ opacity: 0, filter: "blur(4px)" }}
                                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        Every pixel matters. We craft designs with meticulous attention to detail.
                                    </motion.p>
                                <DisplayCards
                                    cards={[
                                        {
                                            icon: <Sparkles className="size-4 text-blue-400" />,
                                            title: "Design Excellence",
                                            description: "100% Design Accuracy",
                                            date: "Every Detail Matters",
                                            iconClassName: "bg-blue-500/20 ring-blue-500/30",
                                            titleClassName: "text-blue-400",
                                            className: "[grid-area:stack] scale-95 hover:scale-100 hover:-translate-y-12 hover:translate-x-2 data-[active=true]:scale-100 data-[active=true]:-translate-y-12 data-[active=true]:translate-x-2 transition-all duration-500",
                                        },
                                        {
                                            icon: <Sparkles className="size-4 text-purple-400" />,
                                            title: "Quality First",
                                            description: "No Compromises Ever",
                                            date: "Guaranteed Excellence",
                                            iconClassName: "bg-purple-500/20 ring-purple-500/30",
                                            titleClassName: "text-purple-400",
                                            className: "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-4 hover:translate-x-14 scale-[0.97] hover:scale-100 data-[active=true]:-translate-y-4 data-[active=true]:translate-x-14 data-[active=true]:scale-100 transition-all duration-500",
                                        },
                                        {
                                            icon: <Sparkles className="size-4 text-emerald-400" />,
                                            title: "Professional",
                                            description: "Enterprise-Grade Quality",
                                            date: "Every Single Time",
                                            iconClassName: "bg-emerald-500/20 ring-emerald-500/30",
                                            titleClassName: "text-emerald-400",
                                            className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-6 hover:translate-x-26 data-[active=true]:translate-y-6 data-[active=true]:translate-x-26 transition-all duration-500",
                                        },
                                    ]}
                                />
                            </CardContent>
                        </Card>
                        </motion.div>

                        {/* Security-Driven Development */}
                        <motion.div
                            className="relative col-span-full sm:col-span-3 lg:col-span-2"
                            initial={{ y: 60, scale: 0.95, rotateX: 10 }}
                            whileInView={{ y: 0, scale: 1, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                        >
                            <Card className="relative w-full h-full overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/[0.02] dark:bg-white/[0.02] border-white/5 group  transition-all duration-700" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                <CardContent className="pt-6">
                                    <motion.div 
                                        className="space-y-2 mb-4 text-center"
                                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <h2 className="text-xl font-medium transition dark:text-white">Security-Driven Development</h2>
                                        <p className="text-sm text-foreground/70">Building secure, robust systems from the ground up</p>
                                    </motion.div>
                                    <motion.div 
                                        className="mt-4"
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <SystemMonitor />
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Feature-Rich & Scalable */}
                        <motion.div
                            className="relative col-span-full sm:col-span-3 lg:col-span-2"
                            initial={{ y: 60, scale: 0.95, rotateX: 10 }}
                            whileInView={{ y: 0, scale: 1, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
                        >
                            <Card className="relative w-full h-full overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/[0.02] dark:bg-white/[0.02] border-white/5 transition-all duration-700" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                <CardContent className="pt-6">
                                    <motion.div 
                                        className="space-y-2 mb-4 text-center"
                                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <h2 className="text-2xl font-medium transition">Feature-Rich & Scalable</h2>
                                        <p className="text-sm text-foreground/70">Built to perform and grow with your vision</p>
                                    </motion.div>
                                    <motion.div 
                                        className="mt-4"
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <ScalabilityMetrics />
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Any Project. Any Scale */}
                        <motion.div
                            className="relative col-span-full lg:col-span-3"
                            initial={{ y: 60, rotateX: 10 }}
                            whileInView={{ y: 0, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                        >
                            <Card className="relative w-full h-full overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/[0.02] dark:bg-white/[0.02] border-white/5 transition-all duration-700" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                                    <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                        <motion.div 
                                            className="space-y-2"
                                            initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <h2 className="text-2xl font-medium transition">Any Project. Any Scale</h2>
                                            <p className="text-foreground/50">From sleek landing pages to full-fledged web apps — we can handle anything you envision.</p>
                                        </motion.div>
                                    </div>
                                    <div className="relative flex h-full items-center justify-center -my-3 sm:-my-6 min-h-[280px]">
                                        <AnimatedBeamMultipleOutputDemo />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Always On Time */}
                        <motion.div
                            className="relative col-span-full lg:col-span-3"
                            initial={{ y: 60, rotateX: 10 }}
                            whileInView={{ y: 0, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                        >
                            <Card className="relative w-full h-full overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/[0.02] dark:bg-white/[0.02] border-white/5 transition-all duration-700" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                                    <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                        
                                        <motion.div 
                                            className="space-y-2"
                                            initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <h2 className="text-2xl font-medium transition">Always On Time</h2>
                                            <p className="text-foreground/50">Deadlines aren&apos;t optional here. We deliver on time — without cutting corners.</p>
                                        </motion.div>
                                    </div>
                                    <div className="relative flex h-full items-center justify-center mt-3 sm:-my-6 sm:-mr-4 lg:-mt-9 min-h-[280px]">
                                        {/* Center icon */}
                                        <motion.div 
                                            className="absolute size-16 rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center shadow-lg overflow-hidden"
                                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 180, damping: 15 }}
                                            whileHover={{ scale: 1.15, rotate: 360, transition: { duration: 0.6, ease: "easeInOut" } }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                                            <Clock className="size-8 text-gray-400 relative z-10" strokeWidth={1.5} />
                                        </motion.div>
                                    
                                    {/* Outer orbit - 4 icons */}
                                    <OrbitingCircles iconSize={48} radius={120} duration={25}>
                                        <div className="size-full rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center shadow-xl overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                                            <FontAwesomeIcon icon={faCode} className="text-emerald-400 text-xl relative z-10" />
                                        </div>
                                        <div className="size-full rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center shadow-xl overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                                            <FontAwesomeIcon icon={faTerminal} className="text-blue-400 text-xl relative z-10" />
                                        </div>
                                        <div className="size-full rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center shadow-xl overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                                            <FontAwesomeIcon icon={faServer} className="text-purple-400 text-xl relative z-10" />
                                        </div>
                                        <div className="size-full rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center shadow-xl overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                                            <FontAwesomeIcon icon={faDatabase} className="text-orange-400 text-xl relative z-10" />
                                        </div>
                                    </OrbitingCircles>
                                    
                                    {/* Inner orbit - 3 icons, faster */}
                                    <OrbitingCircles iconSize={36} radius={75} reverse speed={1.5} duration={20}>
                                        <div className="size-full rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center shadow-lg overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                                            <FontAwesomeIcon icon={faCodeBranch} className="text-pink-400 text-lg relative z-10" />
                                        </div>
                                        <div className="size-full rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center shadow-lg overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                                            <FontAwesomeIcon icon={faRocket} className="text-amber-400 text-lg relative z-10" />
                                        </div>
                                        <div className="size-full rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center shadow-lg overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                                            <FontAwesomeIcon icon={faCode} className="text-cyan-400 text-lg relative z-10" />
                                        </div>
                                    </OrbitingCircles>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
