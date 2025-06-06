const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/5"
          style={{
            width: `${Math.random() * 300 + 50}px`,
            height: `${Math.random() * 300 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 30 + 20}s`,
            animationDelay: `${Math.random() * 5}s`,
            animation: 'float infinite ease-in-out',
          }}
        />
      ))}
      <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(5%, 15%) rotate(5deg); }
            50% { transform: translate(-10%, 5%) rotate(-5deg); }
            75% { transform: translate(8%, -10%) rotate(3deg); }
          }
        `}</style>
    </div>
  )
}

export default AnimatedBackground
