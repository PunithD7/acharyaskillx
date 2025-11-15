import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    {
      value: "10,000+",
      label: "Active Students",
      color: "text-primary"
    },
    {
      value: "500+",
      label: "Partner Companies",
      color: "text-accent"
    },
    {
      value: "50,000+",
      label: "Mock Interviews Completed",
      color: "text-chart-1"
    },
    {
      value: "95%",
      label: "Student Success Rate",
      color: "text-chart-2"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Thousands
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Join the growing community of successful students, educators, and recruiters.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <motion.div 
                className={`text-4xl font-bold ${stat.color} mb-2`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: index * 0.1 + 0.3 
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
