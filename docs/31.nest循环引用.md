# nestjs 循环引用

在nestjs中经常会遇到循环引用的问题，class A 会引用 class B 而 class B 又会引用 class A。nestjs 允许在 providers 与 modules间创建循环引用，但要尽可能的避免此行为。在不可避免的情况下可用以下方式创建循环引用。

### forward reference

**forward reference** 允许nest引用当前还未定义的引用。当两个 class 相互引用时，双方的引用都需要使用 **@Inject** 与 **forwardRef()** 。

### 示例

cats.service.ts
```typescript
@Injectable()
export class CatsService {
    constructor(
        @Inject(forwardRef(() => CommonService))
        private readonly commonService: CommonService,
    ) {}
}
```

common.service.ts
```typescript
@Injectable()
export class CommonService {
    constructor(
        @Inject(forwardRef(() => CatsService))
        private readonly catsService: CatsService,
    ) {}
}
```

common.module.ts
```typescript
@Module({
    imports: [forwradRef(() => CatsModule)]
})
export class CommonModule {}
```

### Module reference

nest提供了 **ModuleRef** ，可以在任意 component 中注入 class。

cats.service.ts
```typescript
export class CatsService implements OnModuleInit {
    private service: Service;
    constructor(private readonly moduleRef: ModuleRef) {}

    onModuleInit() {
        this.service = this.moduleRef.get(Service);
    }
}
```