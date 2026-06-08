export const playLevelUpSound = (): void => {
    const ctx = new AudioContext()

    const notes = [261.63, 329.63, 392.00, 532.25]; //Do Mi Sol Do

    notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15)

        gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.15)
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.15 + 0.05)
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.4)

        oscillator.start(ctx.currentTime + i * 0.15)
        oscillator.stop(ctx.currentTime + i * 0.15 + 0.4)
    })
}

export const playAchievementSound = (): void => {
    const ctx = new AudioContext();

    const notes = [392.00, 523.25, 659.25]; // Sol, Do, Mi

    notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

        gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
        gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + i * 0.12 + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);

        oscillator.start(ctx.currentTime + i * 0.12);
        oscillator.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
};