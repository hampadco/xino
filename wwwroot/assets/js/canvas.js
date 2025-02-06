const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

// تنظیمات اولیه کنوس
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1'; // پشت همه محتوا
canvas.style.pointerEvents = 'none'; // اجازه کلیک روی محتوای پشت کنوس

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// اضافه کردن متغیرهای موس
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let lastMouseMoveTime = Date.now();
let isMouseActive = false;

// تنظیم رنگ‌ها با شفافیت کمتر برای بک‌گراند
const colors = [
	{ r: 255, g: 83, b: 127, a: 0.05 },   // صورتی
	{ r: 0, g: 198, b: 255, a: 0.05 },    // آبی روشن
	{ r: 255, g: 198, b: 0, a: 0.05 },    // زرد
	{ r: 147, g: 88, b: 255, a: 0.05 },   // بنفش
	{ r: 0, g: 255, b: 144, a: 0.05 },    // سبز
	{ r: 0, g: 255, b: 255, a: 0.05 },    // فیروزه‌ای
	{ r: 255, g: 255, b: 255, a: 0.03 }   // سفید
];

class DesignShape {
	constructor() {
		// اشکال ساده‌تر (3 تا 5 ضلعی)
		this.points = 3 + Math.floor(Math.random() * 3);
		
		// محاسبه فاکتور مقیاس بر اساس سایز صفحه
		const scaleFactor = Math.min(width, height) / 1000; // مقیاس پایه
		const baseScale = 1.3; // ضریب بزرگنمایی کلی
		
		// تعیین مدار با فاصله‌های متنوع‌تر و مقیاس بزرگتر
		const minRadius = Math.min(width, height) * 0.12; // افزایش از 0.1
		const maxRadius = Math.min(width, height) * 0.48; // افزایش از 0.45
		this.orbitRadius = minRadius + Math.random() * (maxRadius - minRadius);
		
		// سرعت چرخش متناسب با اندازه مدار
		this.orbitSpeed = (0.2 / this.orbitRadius) * 2;
		
		// سایز متناسب با اندازه صفحه و بزرگتر
		const minSize = 8 * scaleFactor * baseScale;
		const maxSize = 16 * scaleFactor * baseScale;
		this.radius = minSize + Math.random() * (maxSize - minSize);
		
		// افزایش کمی در شفافیت پایه
		this.baseOpacity = 0.15 + Math.random() * 0.1;
		
		this.color = {
			...colors[Math.floor(Math.random() * colors.length)],
			a: this.baseOpacity
		};
		
		// تنظیم موقعیت اولیه در مدار
		this.orbitAngle = Math.random() * Math.PI * 2;
		this.centerX = width/2 + Math.cos(this.orbitAngle) * this.orbitRadius;
		this.centerY = height/2 + Math.sin(this.orbitAngle) * this.orbitRadius;
		
		this.velocityX = 0;
		this.velocityY = 0;
		this.explosionForce = 0;
		
		this.vertices = [];
		this.updateVertices();
		
		// اضافه کردن متغیر برای ردیابی تعامل با موس
		this.isInteractingWithMouse = false;
		this.mouseInteractionForce = 0;
		
		// ذخیره مقادیر اولیه برای بازگشت نرم
		this.originalOrbitRadius = this.orbitRadius;
		this.originalOrbitSpeed = this.orbitSpeed;
		
		// اضافه کردن آرایه برای نگهداری نقاط قبلی
		this.trail = [];
		this.maxTrailLength = 3; // طول رد حرکت
	}

	updateVertices() {
		this.vertices = [];
		for (let i = 0; i < this.points; i++) {
			const angle = this.orbitAngle + (i * Math.PI * 2 / this.points);
			this.vertices.push({
				x: this.centerX + Math.cos(angle) * this.radius,
				y: this.centerY + Math.sin(angle) * this.radius
			});
		}
	}

	// اضافه کردن متد جدید برای محاسبه دفع بین اشکال
	calculateRepulsion(otherShape) {
		const dx = this.centerX - otherShape.centerX;
		const dy = this.centerY - otherShape.centerY;
		const distance = Math.sqrt(dx * dx + dy * dy);
		
		// فاصله حداقل بین دو شکل (مجموع شعاع‌ها + کمی فاصله اضافه)
		const minDistance = this.radius + otherShape.radius + 1;
		
		if (distance < minDistance) {
			// نیروی دفع خیلی ضعیف
			const repelStrength = 0.02;
			const angle = Math.atan2(dy, dx);
			const force = (minDistance - distance) / minDistance * repelStrength;
			
			// اعمال نیروی دفع به سرعت
			this.velocityX += Math.cos(angle) * force;
			this.velocityY += Math.sin(angle) * force;
		}
	}

	update() {
		// چرخش حول خود
		this.orbitAngle += this.orbitSpeed;
		
		// کاهش تدریجی نیروی انفجار
		this.explosionForce *= 0.98;

		// بررسی دفع با سایر اشکال
		shapes.forEach(otherShape => {
			if (otherShape !== this) {
				this.calculateRepulsion(otherShape);
			}
		});

		// بررسی تعامل با موس
		if (isMouseActive) {
			const dx = mouseX - this.centerX;
			const dy = mouseY - this.centerY;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 200) {
				this.isInteractingWithMouse = true;
				// کاهش سرعت افزایش نیروی تعامل
				this.mouseInteractionForce = Math.min(this.mouseInteractionForce + 0.05, 0.6);
				
				const angle = Math.atan2(dy, dx);
				// کاهش شدت نیروی دفع موس
				const repelForce = (200 - distance) * 0.03 * this.mouseInteractionForce;
				
				this.velocityX -= Math.cos(angle) * repelForce;
				this.velocityY -= Math.sin(angle) * repelForce;
			} else {
				this.isInteractingWithMouse = false;
			}
		} else {
			this.isInteractingWithMouse = false;
		}

		// افزایش سرعت کاهش نیروی تعامل با موس
		if (!this.isInteractingWithMouse) {
			this.mouseInteractionForce *= 0.95;
		}

		// ترکیب حرکت مداری و آزاد بر اساس نیروهای مختلف
		const totalDisruption = this.explosionForce + this.mouseInteractionForce;

		// حرکت مداری نرم‌تر
		this.orbitAngle += this.orbitSpeed * (1 - totalDisruption * 0.5);
		const targetX = width/2 + Math.cos(this.orbitAngle) * this.orbitRadius;
		const targetY = height/2 + Math.sin(this.orbitAngle) * this.orbitRadius;

		// نسبت ترکیب حرکت مداری و آزاد
		const transitionForce = Math.max(0.02, totalDisruption);
		
		// حرکت نرم‌تر به سمت مدار
		const orbitPull = 0.02 * (1 - transitionForce);
		this.centerX += (targetX - this.centerX) * orbitPull;
		this.centerY += (targetY - this.centerY) * orbitPull;
		
		// حرکت آزاد با نیروی بیشتر در زمان تعامل
		this.centerX += this.velocityX * transitionForce;
		this.centerY += this.velocityY * transitionForce;
		
		// اصطکاک تدریجی
		const drag = 0.99;
		this.velocityX *= drag;
		this.velocityY *= drag;

		// عبور از لبه‌های صفحه
		if (this.centerX < -this.radius) this.centerX = width + this.radius;
		if (this.centerX > width + this.radius) this.centerX = -this.radius;
		if (this.centerY < -this.radius) this.centerY = height + this.radius;
		if (this.centerY > height + this.radius) this.centerY = -this.radius;

		// اضافه کردن موقعیت فعلی به آرایه رد حرکت
		this.trail.unshift({ x: this.centerX, y: this.centerY });
		
		// محدود کردن طول آرایه
		if (this.trail.length > this.maxTrailLength) {
			this.trail.pop();
		}

		this.updateVertices();
	}

	draw() {
		// کشیدن رد حرکت
		if (this.trail.length > 1) {
			ctx.beginPath();
			ctx.moveTo(this.trail[0].x, this.trail[0].y);
			
			for (let i = 1; i < this.trail.length; i++) {
				ctx.lineTo(this.trail[i].x, this.trail[i].y);
			}
			
			// شفافیت رد حرکت بر اساس سرعت
			const speed = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
			const trailOpacity = Math.min(speed * 0.3, 0.1) * this.baseOpacity;
			
			ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${trailOpacity})`;
			ctx.lineWidth = 1;
			ctx.stroke();
		}

		const speed = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
		
		// درخشندگی کمتر در حالت عادی
		const energyFactor = Math.max(
			speed / 4,
			this.mouseInteractionForce * 1.5
		);

		ctx.beginPath();
		ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
		
		for (let i = 1; i < this.vertices.length; i++) {
			ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
		}
		
		ctx.closePath();

		// افزایش کمی در شفافیت خطوط و پرکردن
		const alpha = this.baseOpacity * (1 + energyFactor * 0.6);
		const glowEffect = this.mouseInteractionForce > 0.1 ? 1.5 : 1;
		
		ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * glowEffect})`;
		ctx.lineWidth = 1 + energyFactor * 0.5;
		ctx.stroke();
		
		// افزایش کمی در شفافیت پرکردن
		ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.25})`;
		ctx.fill();

		// افکت درخشش ملایم‌تر
		if (this.mouseInteractionForce > 0.1) {
			ctx.beginPath();
			ctx.arc(this.centerX, this.centerY, this.radius * 1.1, 0, Math.PI * 2);
			ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.mouseInteractionForce * 0.2})`;
			ctx.stroke();
		}
	}

	applyExplosion(explosionX, explosionY, power) {
		// محاسبه فاصله از نقطه انفجار
		const dx = this.centerX - explosionX;
		const dy = this.centerY - explosionY;
		const distance = Math.sqrt(dx * dx + dy * dy);
		
		// محدوده تاثیر انفجار متناسب با اندازه صفحه
		const explosionRadius = Math.min(width, height) * 0.3;
		
		if (distance < explosionRadius) {
			// کاهش قدرت انفجار و متناسب‌سازی با اندازه صفحه
			const scaledPower = power * (Math.min(width, height) / 1920) * 0.5;
			const force = (1 - distance / explosionRadius) * scaledPower;
			const angle = Math.atan2(dy, dx);
			
			// اعمال نیرو به سرعت با شدت کمتر
			this.velocityX += Math.cos(angle) * force * 0.5;
			this.velocityY += Math.sin(angle) * force * 0.5;
			
			// کاهش تاثیر انفجار روی سرعت چرخش
			this.velocityX *= (1 + force * 0.05);
			this.velocityY *= (1 + force * 0.05);
			
			// ذخیره نیروی انفجار برای افکت‌های بصری
			this.explosionForce = force;
		}
	}
}

// تنظیم تعداد اشکال بر اساس مساحت صفحه
const screenArea = width * height;
const baseScreenArea = 1920 * 1080; // مساحت پایه برای مقایسه
const baseShapeCount = 350; // تعداد پایه اشکال

// محاسبه تعداد اشکال بر اساس نسبت مساحت
const densityFactor = 1.2; // ضریب تراکم
const shapeCount = Math.floor(baseShapeCount * Math.pow(screenArea / baseScreenArea, 0.7) * densityFactor);

// محدود کردن حداقل و حداکثر تعداد اشکال
const minShapes = 200;
const maxShapes = 800;
const totalShapes = Math.min(Math.max(shapeCount, minShapes), maxShapes);

const shapes = Array(totalShapes).fill().map(() => new DesignShape());

// بروزرسانی وضعیت موس
function updateMouseState() {
	const currentTime = Date.now();
	const mouseHasMoved = mouseX !== lastMouseX || mouseY !== lastMouseY;
	
	if (mouseHasMoved) {
		lastMouseMoveTime = currentTime;
		isMouseActive = true;
		lastMouseX = mouseX;
		lastMouseY = mouseY;
	} else if (currentTime - lastMouseMoveTime > 1000) { // یک ثانیه بی‌حرکتی
		isMouseActive = false;
	}
}

function animate() {
	// پس‌زمینه نیمه‌شفاف برای ایجاد افکت محو شدن
	ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
	ctx.fillRect(0, 0, width, height);

	updateMouseState();
	
	shapes.forEach(shape => {
		shape.update();
		shape.draw();
	});

	requestAnimationFrame(animate);
}

// اضافه کردن event listener برای موس
document.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
});

// اضافه کردن event listener برای کلیک
document.addEventListener('click', (e) => {
	shapes.forEach(shape => {
		shape.applyExplosion(e.clientX, e.clientY, 50); // افزایش قدرت انفجار به 50
	});
});

// تنظیم مجدد سایز کنوس در هنگام تغییر سایز پنجره
window.addEventListener('resize', () => {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
});

// شروع انیمیشن
animate();


